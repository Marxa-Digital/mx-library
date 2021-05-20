import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MxSearch {

  colDocs:any

  constructor (
    private fs: AngularFirestore,
  ) { }


  async onSearchByString(query: string, collection: string, field: string) {
    const
      colRef = this.fs.collection( collection ).ref,
      Aquery = query.split( ' ' ),
      queryUpper = query.toUpperCase(),
      AqueryUpper = queryUpper.split( ' ' ),
      queryLow = query.toLowerCase(),
      AqueryLow = queryLow.split( ' ' ),
      queryCap = this.capitalize( query ),
      AqueryCap = queryCap.split( ' ' );

    this.colDocs = []
    this.colDocs = await colRef.get()

    var finded:any[] = []
    var suggest = []

    await this.asyncForEach( this.colDocs.docs, async ( doc:any ) => {
      let Doc = doc.data()
      console.log( Doc[ field ], query);


      // 1. Busca query normal
      if ( Doc[ field ].includes( query ) ) { finded.push( Doc ) }
      else if ( Aquery.length > 1 ) {
        await this.asyncForEach(Aquery, (word:string ) => {
          if (Doc[field].includes(word)) { return finded.push(Doc) }
          else {return}
        })
      }


      // 2. Busca query mayus
      if ( Doc[ field ].includes( queryUpper ) ) { finded.push( Doc ) }
      else if ( AqueryUpper.length > 1 ) {
        await this.asyncForEach( AqueryUpper, ( word :string) => {
          if (Doc[field].includes(word)) return finded.push(Doc)
          else return
        } )
      }


      // 3. Busca query minus
      if ( Doc[ field ].includes( queryLow ) ) { finded.push( Doc ) }
      else if ( AqueryLow.length > 1 ) {
        await this.asyncForEach( AqueryLow, ( word :string) => {
          if (Doc[field].includes(word)) return finded.push(Doc)
          else return
        })
      }


      // 4. Busca query capital
      if ( Doc[ field ].includes( queryCap ) ) { finded.push( Doc ) }
      else if ( AqueryCap.length > 1 ) {
        await this.asyncForEach( AqueryCap, ( word :string) => {
          if (Doc[field].includes(word)) return finded.push(Doc)
          else return
        } )
      }


      return

    })

    return  finded

  }

  async asyncForEach(array: any[] | Map<number, any>, callback: any) {
		if (Array.isArray(array)) {
			for (let index = 0; index < array.length; index++) {
				await callback(array[index], index, array);
			}
		} else {
			for (let index = 0; index < array.size; index++) {
				await callback(array.get(index), index, array);
			}
		}
	}


  capitalize( text: string, lower = false ) {
    return ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
  }
}
