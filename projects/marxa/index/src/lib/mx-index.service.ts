import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { mxIndexAnchor, mxIndexEvent, mxSortCriteria } from './mx-index.model';
import firebase from 'firebase/app'



@Injectable({ providedIn: 'root' })
export class MxIndex {

  /** Emite el evento cuando se realiza un cambio de página. */
  public indexEvent: EventEmitter<mxIndexEvent> = new EventEmitter();
  /** Observable de la data obtenida por el index */
  public queryData: Subject<any[]> = new Subject();
  /** Notifica cuando el proceso de indexado inicia y termina */
  public loadingQuery: Subject<boolean> = new Subject();
  /** The collection to get the query indexed. Can be a only string or a path with even number of slashes. Ej. 'collection/document/collection' */
  public collection: string = '';
  /** The field in the collection docs to query and order*/
  public field = '';
  /** The order to sort the collection docs. `asc` as default */
  public order: 'asc' | 'desc' = 'asc';
  /** The criteria to compare the field */
  public criteria: string = '';
  /** The type of comparator if you use the static filter */
  public compareType: firebase.firestore.WhereFilterOp = '==';
  /** Wheather the documents called from the collection will merge or not */
  public mergeQuery: boolean = false
  /** The query cant selected */
  public queryCant: number = 0;

  private pageSize: number = 0;
  private currentPage: number = 0;
  private pageContent: any[] = [];

  private first: number = 1;
  private last: number = 0;
  private pageAnchors: mxIndexAnchor[] = [];

  constructor(private fs: AngularFirestore) {}

  /** Reorder the content and clean the array data to start to index again*/
  setFieldtoSort(fieldSelected: MatSelectChange | string) {
    this.field =
      typeof fieldSelected == 'string' ? fieldSelected : fieldSelected.value;
    this.pageContent = [];
    this.pageAnchors = [];
    this.initIndex(this.collection, this.field, this.queryCant);
  }

  /** The order to sort the content is defined by default as `asc`: ascendent. But if you need get inverse, you can define as `desc` */
  setOrderSort(sortOrder: MatSelectChange | 'asc' | 'desc') {
    this.order = typeof sortOrder === 'string' ? sortOrder : sortOrder.value;
    this.initIndex(this.collection, this.field, this.queryCant, this.order, this.mergeQuery)
  }

  /** Activates the static filter */
  setCriteriaFilter(
    /** It is required to set some criteria in the filtered query */
    criteria: MatSelectChange | string,
    /** If needs init a new filter, this value is optional. By default gets the `field` defined in the init of the index service */
    field?: string,
    /** By default it will search by `==` to compare. If you need another compare kind, use `compareByField` function*/
    order?: 'asc' | 'desc'
  ) {
    if ( !criteria ) {
      this.criteria = ''
      this.initIndex(this.collection, this.field, this.queryCant);
    } else {
      this.criteria = typeof criteria == 'string' ? criteria : criteria.value;
      this.field = field === undefined || field === null || field === '' ? this.field : field;
      this.order = order || this.order

      this.initIndex(this.collection, this.field, this.queryCant, this.order, this.mergeQuery)
    }
    return <mxSortCriteria> { collection: this.collection, field: this.field, queryCant: this.queryCant, order: this.order, mergeQuery: this.mergeQuery}
  }

  /** Initializes the index from the collection and get first query cant selected. If not selected query cant, default will be 20 */
  async initIndex(
    /** Collection to query */
    CollectionToSort: string,
    /** Field to sort collection */
    FieldToSort: string,
    /** Query cant of documents */
    queryCant: number,
    /** OPTIONAL. Order of collection */
    order?: 'asc' | 'desc',
    /** OPTIONAL. To merge the query calls */
    merge?: boolean
  ) {

    // console.log( 'initIndex', CollectionToSort, FieldToSort, queryCant, order, merge )

    this.loadingQuery.next(true);
    // Define docs to query
    this.collection = CollectionToSort || this.collection;
    this.field =  FieldToSort || this.field;
    this.queryCant = queryCant || 20;
    this.first = 1;
    this.order = order || this.order
    this.mergeQuery = merge || false

    // Get the collection size to index
    var queryCollection = !this.criteria
      ? await this.fs
          .collection(this.collection)
          .ref.orderBy(this.field, this.order)
      : await this.fs
          .collection(this.collection).ref
          .where(this.field, '>=', this.criteria)
          .where(this.field, '<=', this.criteria+'~')
          .orderBy(this.field, this.order)

    var query = await queryCollection
      .limit(this.queryCant == 0 ? 20 : this.queryCant)
      .get();

    this.pageSize = query.size;
    this.last = this.pageSize < this.queryCant ? this.pageSize : this.queryCant;

    this.pageContent = [];
    if (this.pageSize > 0) {
      await query.forEach(async (doc) => {
        return this.pageContent.push(doc.data());
      });

      this.last = this.pageSize
      this.indexEvent.next({
        firstIndex: this.first,
        lastIndex: this.last,
        pageSize: this.pageSize,
      });
      this.queryData.next(this.pageContent);

      // Define anchors
      // console.log( this.pageContent, this.queryCant, this.pageSize )

      this.pageAnchors.push({
        page: this.currentPage,
        firstQuery: this.pageContent[0][this.field],
        lastQuery:
          this.pageSize < this.queryCant
          ? this.pageContent[this.last - 1][this.field]
          : this.pageContent[this.queryCant - 1][this.field]
      });
    }
    this.queryData.next(this.pageContent);
    this.loadingQuery.next( false );

  }


  /** Permite cambiar de página en la consulta del index hacia el siguiente o el anterior */
  async changePage(direction: 'next' | 'prev') {
    this.loadingQuery.next(true);
    var anchor: mxIndexAnchor = {firstQuery: '', lastQuery: '', page: this.currentPage}
    var pageAnchor = this.pageAnchors.find((page) =>
      page.page == ( direction === 'next' ? this.currentPage : this.currentPage-1)
    )
    if (pageAnchor) anchor = pageAnchor;


    var queryCollection = !this.criteria
      ? await this.fs
          .collection(this.collection)
          .ref.orderBy(this.field, this.order)
      : await this.fs
          .collection(this.collection).ref
          .where(this.field, '>=', this.criteria)
          .where(this.field, '<=', this.criteria+'~')
          .orderBy(this.field, this.order)

    let query = await (direction == 'next'
      ? queryCollection.startAfter(anchor.lastQuery)
      : queryCollection.startAt(anchor.firstQuery)
      ).limit(this.queryCant).get()


    if (query.size > 0) {

      if (!this.mergeQuery) this.pageContent = []
      await query.forEach(async (doc) => {
        return this.pageContent.push(doc.data());
      });

      this.pageSize = query.size
      if (direction == 'next') {
        this.first = this.first + this.queryCant
        this.last = this.pageSize + (this.first - 1)
        this.currentPage += 1
      } else {
        this.last = this.first - 1
        this.first = this.first - this.queryCant;
        this.currentPage -= 1
      }
      this.indexEvent.emit({
        firstIndex: this.first,
        lastIndex: this.last,
        pageSize: this.pageSize,
      });

      // Define anchors
      this.pageAnchors.push({
        page: this.currentPage,
        firstQuery: this.pageContent[0][this.field],
        lastQuery: this.pageContent[this.pageContent.length - 1][this.field],
      });

      this.queryData.next(this.pageContent);
      this.loadingQuery.next(false);
    }

  }
}
