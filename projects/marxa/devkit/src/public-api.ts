/*
 * Public API Surface of devkit
 */

// ROOT
export * from './lib/marxa-devkit.service';
export * from './lib/marxa-devkit.module';
export * from './lib/main.model';

// ALERT
export * from './lib/alert/alert.module'
export * from './lib/alert/alert.service'
export * from './lib/alert/alerts.model'

// CACHE
export * from './lib/cache/mx-cache.service';
export * from './lib/cache/cache.module';

// COLOR
export * from './lib/color/mx-colors.module';
export * from './lib/color/mx-color.service';
export * from './lib/color/mx-color.model';
export * from './lib/color/directives/color.directive';
export * from './lib/color/directives/background.directive';
export * from './lib/color/directives/random-background.directive';

// COMMONS
export * from './lib/common/mx-commons.module';
export * from './lib/common/mx-commons.service';
export * from './lib/common/directives/stop-propagation.directive'
export * from './lib/common/pipes/list-filter.pipe'
export * from './lib/common/directives/mx-var.directive'

// DATE
export * from './lib/date-time/mx-date.module'
export * from './lib/date-time/mx-date.service'
export * from './lib/date-time/timer/last-timer.component'
export * from './lib/date-time/pipes/mx-time.pipe'
export * from './lib/date-time/pipes/timestamp.pipe'
export * from './lib/date-time/pipes/counting-time.pipe'

// LOADING
export * from './lib/loading/loading.service'
export * from './lib/loading/loading.module'
export * from './lib/loading/components/waiting-bar/waiting-bar.component'
export * from './lib/loading/components/loading-overlay/loading-overlay.component'

// RESPONSIVE
export * from './lib/responsive/mx-responsive.module'
export * from './lib/responsive/mx-responsive.service'
export * from './lib/responsive/directives/hideOn.directive'
export * from './lib/responsive/directives/stretchHeight.directive'
export * from './lib/responsive/directives/stretchWidth.directive'
export * from './lib/responsive/directives/fix-scroll.directive'

// SEO
export * from './lib/seo/mx-seo.service'

// TEXT
export * from './lib/text/mx-text.service'
export * from './lib/text/mx-text.module'
export * from './lib/text/pipes/mx-capitalize.pipe'
export * from './lib/text/directives/lowercase.directive'
export * from './lib/text/directives/uppercase.directive'
export * from './lib/text/directives/normalize.directive'
export * from './lib/text/directives/prevent-spaces.directive'
export * from './lib/text/pipes/cut-text.pipe'
