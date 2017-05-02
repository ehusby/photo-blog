import {Component, OnInit} from '@angular/core'
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {MetaTagsService, GoogleAnalyticsService} from '../../../core';
import {TransferState} from '../../../sys';
import {LinkedDataService, ScreenDetectorService} from '../../../core';
import {AppService, TitleService, AuthProviderService, ScrollFreezerService} from '../../../shared';
import '../../../../assets/static/img/meta_image.jpg'

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
    appContentStyles:{overflow:string} = {overflow: ''};

    constructor(protected cache:TransferState,
                protected router:Router,
                protected app:AppService,
                protected title:TitleService,
                protected metaTags:MetaTagsService,
                protected linkedData:LinkedDataService,
                protected authProvider:AuthProviderService,
                protected screenDetector:ScreenDetectorService,
                protected scrollFreezer:ScrollFreezerService,
                protected googleAnalytics:GoogleAnalyticsService) {
    }

    ngOnInit():void {
        this.initMeta();
        this.initRouterSubscribers();
        this.initScrollFreezerSubscribers();
        this.cache.set('state-transfer', true);
        this.googleAnalytics.init();
    }

    protected initMeta():void {
        this.metaTags.setWebsiteName(this.app.getName());
        this.metaTags.setUrl(this.app.getUrl());
        this.metaTags.setTitle(this.title.getPageName());
        this.metaTags.setDescription(this.app.getDescription());
        this.metaTags.setImage(this.app.getImage());
    }

    protected initLinkedData():void {
        this.linkedData.setItems([
            {
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                'name': this.app.getName(),
                'url': this.app.getUrl(),
            }
        ]);
    }

    protected initRouterSubscribers():void {
        this.router.events
            .filter((event:any) => event instanceof NavigationEnd)
            .subscribe((event:NavigationEnd) => this.metaTags.setUrl(this.app.getUrl() + event.urlAfterRedirects));

        this.router.events
            .filter((event:any) => event instanceof NavigationStart)
            .subscribe((event:NavigationStart) => this.initLinkedData());
    }

    protected initScrollFreezerSubscribers():void {
        this.scrollFreezer.freezed.subscribe(() => this.appContentStyles.overflow = 'hidden');
        this.scrollFreezer.unfreezed.subscribe(() => this.appContentStyles.overflow = '');
    }

    onShowSideBar(event:any):void {
        this.screenDetector.isSmallScreen() && this.scrollFreezer.freeze()
    }

    onHideSideBar(event:any):void {
        this.scrollFreezer.unfreeze();
    }

    onToggleSideBar(event:any):void {
        event.isVisible ? this.onShowSideBar(event) : this.onHideSideBar(event);
    }
}
