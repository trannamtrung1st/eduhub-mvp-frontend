import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import SwiperCore, { Navigation } from "swiper/core";
import { SwiperComponent } from 'swiper/angular';

import { COMMENTS } from '@domains/comment/constants';

import * as CommonCommands from '@core/common/commands/common.commands';
import * as BlogQueries from '@core/blog/queries/blog.queries';
import { BlogModel } from '@core/blog/states/models/blog.model';
import { BlogViewModel } from '@presentation/cross/blog/blog-list-item/view-models/blog-view.model';

import { BlogState } from '@core/blog/states/blog.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss']
})
export class BlogDetailPageComponent extends BaseComponent<BlogDetailState> implements OnInit, OnDestroy {

  @ViewChild('recommendedBlog') private _recommendedBlogSwiper?: SwiperComponent;

  protected transferStateKeyName: string = BlogDetailPageComponent.name;

  DEMO_BLOG_CONTENT = DEMO_BLOG_CONTENT;

  blog?: BlogViewModel;
  recommendedBlogs: BlogViewModel[];
  comments = COMMENTS;
  currentComment: string;

  @Select(BlogState.recommendedBlogs) private _recommendedBlogs$!: Observable<BlogModel[]>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _route: ActivatedRoute) {
    super(platformId, transferState);
    this.recommendedBlogs = [];
    this.currentComment = '';
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    this._route.params.subscribe(async params => {
      const id = params['id'];

      if (isBrowser) {
        const pageEl = document.querySelector('html') as HTMLElement;
        pageEl.scrollTop = 0;
        this.blog = undefined;
        this._store.dispatch(new CommonCommands.ResetLoader());
        this._recommendedBlogSwiper?.swiperRef.slideTo(0, 0);
      }

      if (this.shouldLoad) {
        const getRecommendedBlogs$ = this._getRecommendedBlogs(id);

        if (this.isPlatformServer) {
          await getRecommendedBlogs$;
          this.setTransferredState(new BlogDetailState(
            this.recommendedBlogs
          ));
        } else {
          // [TODO] Get blog detail
          this.blog = {} as BlogViewModel;
          getRecommendedBlogs$.then(success => success && this._store.dispatch(new CommonCommands.HideLoader()));
        }
      } else {
        // [TODO] Get blog detail
        this.blog = {} as BlogViewModel;
        this.patchTransferredState(this);
        isBrowser && this._store.dispatch(new CommonCommands.HideLoader());
      }
    });
  }

  private _getRecommendedBlogs(id: string) {
    const query = new BlogQueries.GetRecommended(id);
    return this._store.dispatch(query)
      .pipe(withLatestFrom(this._recommendedBlogs$))
      .toPromise()
      .then(([_, blogs]) => {
        this.recommendedBlogs = blogs.map(blog => cloneDeep(blog));
        return true;
      });
  }
}

class BlogDetailState {

  constructor(
    public recommendedBlogs: BlogViewModel[] = []
  ) {
  }
}

const DEMO_BLOG_CONTENT = `<script>setTimeout(()=>alert('[TODO] Demo XSS'), 2000); console.log('XSS');</script>
<div class="row justify-content-center postcontent x-hidden-focus" id="featured">

	<div class="entry-content col-12 sharepostcontent x-hidden-focus">
        <h1 class="entry-title">Announcing .NET MAUI Preview 4</h1>        
         <div class="row justify-content-center"><div class="col-md-4"><div style="margin:20px 0; text-align:center;"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/04/davidortinau-150x150.png" src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/04/davidortinau-150x150.png" width="58" height="58" alt="David Ortinau" class="avatar avatar-58 wp-user-avatar wp-user-avatar-58 alignnone photo lazyloaded"><p style="font-size:20px;">David</p></div></div></div><div style="clear: both; padding-bottom: 10px;"></div>     
        <div class="entry-meta entry-meta-layout">
            <p style="text-align:center;font-size:14px;color:#616161;">May 25th, 2021</p>
		</div><!-- .entry-meta -->

        <div class="social-icon-bar-mobile row justify-content-center">
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://devblogs.microsoft.com/dotnet/announcing-net-maui-preview-4/" target="_blank" title="Share on Facebook" rel="noopener noreferrer nofollow" class="facebook"><i class="fa fa-facebook"></i></a>
    <a href="https://twitter.com/intent/tweet?url=https://devblogs.microsoft.com/dotnet/announcing-net-maui-preview-4/&amp;text=Announcing .NET MAUI Preview 4" target="_blank" title="Share on Twitter" rel="noopener noreferrer nofollow" class="twitter"><i class="fa fa-twitter"></i></a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://devblogs.microsoft.com/dotnet/announcing-net-maui-preview-4/" target="_blank" title="Share on LinkedIn" rel="noopener noreferrer nofollow" class="linkedin"><i class="fa fa-linkedin"></i></a>
</div>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-1024x715.png" src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-1024x715.png" alt="Image maui weather hero sm" width="640" height="447" class="aligncenter size-large wp-image-33048 lazyloaded" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-1024x715.png 1024w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-300x210.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-768x536.png 768w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm.png 1393w" sizes="(max-width: 640px) 100vw, 640px" srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-1024x715.png 1024w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-300x210.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm-768x536.png 768w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/maui-weather-hero-sm.png 1393w"></a></p>
<p>Today we are pleased to announce the availability of .NET Multi-platform App UI (.NET MAUI) Preview 4. Each preview introduces more controls and features to this multi-platform toolkit on our way to general availability this November at <a href="www.dotnetconf.net">.NET Conf</a>. .NET MAUI now has enough building blocks to build functional applications for all supported platforms, new capabilities to support running Blazor on the desktop, and exciting progress in Visual Studio to support .NET MAUI.</p>
<h2 id="weather-21">Weather ’21<a aria-labelledby="weather-21" class="linkicon" href="#weather-21"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p>To showcase our progress in Preview 4 for Microsoft Build, we rapidly designed and developed a simple yet beautiful weather app. As we wait for Visual Studio to integrate .NET MAUI productivity features, we began with Xamarin.Forms. We implemented each UI widget and screen with shared styling in a single codebase. After a few hours, we then ported that work to .NET MAUI by making a few, small changes such as adopting the new <code class=" prettyprinted" style=""><span class="typ">Microsoft</span><span class="pun">.</span><span class="typ">Maui</span></code> namespace. The process was painless and quick!</p>
<p><button class="aligncenter size-large wp-image-33044 lazyloaded" style="position:relative;cursor:pointer;width:640px;height:578px;background:none;border:none;padding:0;" aria-label="Gif Image"><div class="gifffer-play-button" style="width:60px;height:60px;border-radius:30px;background:rgba(0, 0, 0, 0.3);position:absolute;top:50%;left:50%;margin:-30px"><span><i class="fabric-icon fabric-icon--Play"></i></span></div><canvas width="640" height="578" style="width: 100%; height: 100%;"></canvas></button></p>
<p>We also took the opportunity to show have easy it is to light up deep platform integrations by implementing app actions, an icon in the system tray (status bar), and platform-native notifications all from a single project running on Android, iOS, macOS, and Windows.</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="kwd">private</span><span class="pln"> </span><span class="kwd">void</span><span class="pln"> </span><span class="typ">SetupAppActions</span><span class="pun">()</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
    </span><span class="kwd">try</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
        </span><span class="typ">AppActions</span><span class="pun">.</span><span class="typ">SetAsync</span><span class="pun">(</span><span class="pln">   
            </span><span class="kwd">new</span><span class="pln"> </span><span class="typ">AppAction</span><span class="pun">(</span><span class="str">"current_info"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"Check Current Weather"</span><span class="pun">,</span><span class="pln"> icon</span><span class="pun">:</span><span class="pln"> </span><span class="str">"current_info"</span><span class="pun">),</span><span class="pln">
            </span><span class="kwd">new</span><span class="pln"> </span><span class="typ">AppAction</span><span class="pun">(</span><span class="str">"add_location"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"Add a Location"</span><span class="pun">,</span><span class="pln"> icon</span><span class="pun">:</span><span class="pln"> </span><span class="str">"add_location"</span><span class="pun">)</span><span class="pln">
        </span><span class="pun">);</span><span class="pln">
    </span><span class="pun">}</span><span class="pln">
    </span><span class="kwd">catch</span><span class="pln"> </span><span class="pun">(</span><span class="typ">System</span><span class="pun">.</span><span class="typ">Exception</span><span class="pln"> ex</span><span class="pun">)</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
        </span><span class="typ">Debug</span><span class="pun">.</span><span class="typ">WriteLine</span><span class="pun">(</span><span class="str">"App Actions not supported"</span><span class="pun">,</span><span class="pln"> ex</span><span class="pun">);</span><span class="pln">
    </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span></pre>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations-1024x474.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAuAQMAAADk7y4dAAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAD0lEQVQokWNgGAWjYGABAAKEAAEeAQuIAAAAAElFTkSuQmCC" alt="Image platform integrations png" width="640" height="296" class="aligncenter size-large wp-image-33028 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations-1024x474.png 1024w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations-300x139.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations-768x356.png 768w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations-1536x711.png 1536w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/platform-integrations.png 1564w" sizes="(max-width: 640px) 100vw, 640px"></a></p>
<p>Check out the <a href="https://github.com/davidortinau/WeatherTwentyOne" target="_blank">WeatherTwentyOne source code here</a> on GitHub, and our demos from Build 2021.</p>
<h2 id="new-features">New Features<a aria-labelledby="new-features" class="linkicon" href="#new-features"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p>Progress continues porting controls and layouts from Xamarin.Forms to the .NET MAUI architecture. In this way, .NET MAUI both is excitingly new and not new at the same time. We have learned much over the past 7 years about how to make cross-platform native UI performant and easy to extend, and we are putting that to work here. For ongoing status of this work visit our <a href="https://github.com/dotnet/maui/wiki/Status" target="_blank">GitHub status report</a>.</p>
<h3 id="blazorwebview">BlazorWebView<a aria-labelledby="blazorwebview" class="linkicon" href="#blazorwebview"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h3>
<p>The new <code class=" prettyprinted" style=""><span class="typ">BlazorWebView</span></code> enables you to host a Blazor web application right in your .NET MAUI application and take advantage of seamless native platform features and UI controls. The control can be added to any XAML page and pointed to the root of the Blazor application.</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="tag">&lt;BlazorWebView</span><span class="pln"> 
    </span><span class="atn">HostPage</span><span class="pun">=</span><span class="atv">"wwwroot/index.html"</span><span class="pln">
    </span><span class="atn">Services</span><span class="pun">=</span><span class="atv">"{StaticResource Services}"</span><span class="tag">&gt;</span><span class="pln">
    </span><span class="tag">&lt;BlazorWebView.RootComponent&gt;</span><span class="pln">
        </span><span class="tag">&lt;RootComponent</span><span class="pln"> 
            </span><span class="atn">Selector</span><span class="pun">=</span><span class="atv">"#app"</span><span class="pln">
            </span><span class="atn">ComponentType</span><span class="pun">=</span><span class="atv">"{x:Type local:Main}"</span><span class="pln">
        </span><span class="tag">/&gt;</span><span class="pln">
    </span><span class="tag">&lt;/BlazorWebView.RootComponent&gt;</span><span class="pln">
</span><span class="tag">&lt;/BlazorWebView&gt;</span></pre>
<p>For a deeper look at this powerful integration, read more on our <a href="https://devblogs.microsoft.com/aspnet">ASP.NET blog</a>.</p>
<h3 id="splash-screen">Splash Screen<a aria-labelledby="splash-screen" class="linkicon" href="#splash-screen"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h3>
<p>On mobile platforms especially you want your first screen to appear as quickly as possible, and this is done by implementing a static splash screen. .NET MAUI now has a single place to describe your splash screen for all platforms that support them.</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="tag">&lt;MauiSplashScreen</span><span class="pln"> </span><span class="atn">Include</span><span class="pun">=</span><span class="atv">"Resources\appiconfg.svg"</span><span class="pln"> </span><span class="atn">Color</span><span class="pun">=</span><span class="atv">"#512BD4"</span><span class="pln"> </span><span class="tag">/&gt;</span></pre>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1-1024x1024.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAFElEQVQ4jWNgGAWjYBSMglFATwAABXgAAfmlXscAAAAASUVORK5CYII=" alt="Image splash screens" width="640" height="640" class="aligncenter size-large wp-image-33039 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1-1024x1024.png 1024w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1-300x300.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1-150x150.png 150w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1-768x769.png 768w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/splash-screens-1.png 1313w" sizes="(max-width: 640px) 100vw, 640px"></a></p>
<p>Any image format may be provided along with a background brush, similar to how we also do app icons. For more advanced scenarios, platform-native splash screen methods all still apply.</p>
<h3 id="raw-assets">Raw Assets<a aria-labelledby="raw-assets" class="linkicon" href="#raw-assets"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h3>
<p>.NET MAUI now makes it very easy to add other assets to your project and reference them directly while retaining platform-native performance. For example, if you want to display a static HTML file in a <code class=" prettyprinted" style=""><span class="typ">WebView</span></code> you can add the file to your project and annotate it as a <code class=" prettyprinted" style=""><span class="typ">MauiAsset</span></code> in the properties.</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="tag">&lt;MauiAsset</span><span class="pln"> </span><span class="atn">Include</span><span class="pun">=</span><span class="atv">"Resources\Raw\index.html"</span><span class="pln"> </span><span class="tag">/&gt;</span></pre>
<blockquote><p>Tip: you can also use wildcards to enable all files in a directory: <code class=" prettyprinted" style=""><span class="typ">Include</span><span class="pun">=</span><span class="str">"Resources\Raw\*"</span></code></p></blockquote>
<p>Then you can use it in your application by filename.</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="tag">&lt;WebView</span><span class="pln"> </span><span class="atn">Source</span><span class="pun">=</span><span class="atv">"index.html"</span><span class="pln"> </span><span class="tag">/&gt;</span></pre>
<h2 id="visual-studio-productivity">Visual Studio Productivity<a aria-labelledby="visual-studio-productivity" class="linkicon" href="#visual-studio-productivity"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p>In <a href="https://visualstudio.microsoft.com/vs/preview/" target="_blank">Visual Studio 16.11 Preview 1</a> we get a first look at the productivity features for .NET MAUI including new run options for a multi-targeted single project, and the all-new .NET Hot Reload for editing your managed code.</p>
<h3 id="single-project-run">Single Project Run<a aria-labelledby="single-project-run" class="linkicon" href="#single-project-run"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h3>
<p>Single Project introduces a new experience for selecting the target platform and device when running your .NET MAUI applications. These changes simplify the startup process and give you access to all the platforms and devices in a single place.</p>
<p>For Single Project, platform-specific application projects are no longer within the solution, thus you will no longer right-click on a project to set it as the startup project.</p>
<p>In the new target debug selector, you will select the platform you are targeting first. After selecting your target platform, you will be given the list of devices you can run your .NET MAUI application on. All of this will be accessible through the Run Menu when you have a .NET MAUI Single Project.</p>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/run-static-profiles.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/run-static-profiles.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAkAQMAAABFdA17AAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAADklEQVQYlWNgGAUjEQAAAfgAAWBLOoIAAAAASUVORK5CYII=" alt="Image run static profiles" width="800" height="289" class="aligncenter size-full wp-image-33045 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/run-static-profiles.png 800w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/run-static-profiles-300x108.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/run-static-profiles-768x277.png 768w" sizes="(max-width: 800px) 100vw, 800px"></a></p>
<p>The new run menu is the first of a host of changes within Visual Studio to support Single Project applications. We’ll be announcing new features in the upcoming releases, so keep an eye out for updates!</p>
<h3 id="-net-hot-reload">.NET Hot Reload<a aria-labelledby="-net-hot-reload" class="linkicon" href="#-net-hot-reload"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h3>
<p><a href="https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/">.NET Hot Reload</a> is a new experience that enables you to make live edits to your .NET MAUI app’s source code while it is running, reducing the number of times you need to rebuild your app.</p>
<p>To start testing this feature install both .NET 6 Preview 4 and <a href="https://visualstudio.microsoft.com/vs/preview/" target="_blank">Visual Studio 2019 version 16.11 Preview 1</a>. Start your app through the Visual Studio debugger (F5) targeting a WinUI 3 host. Once your app is running, you’ll now have the new option to make code changes and apply them using our new “apply code changes” button as illustrated below.</p>
<p><button class="aligncenter size-large wp-image-33043 lazyload" style="position:relative;cursor:pointer;width:640px;height:290px;background:none;border:none;padding:0;" aria-label="Gif Image"><div class="gifffer-play-button" style="width:60px;height:60px;border-radius:30px;background:rgba(0, 0, 0, 0.3);position:absolute;top:50%;left:50%;margin:-30px"><span><i class="fabric-icon fabric-icon--Play"></i></span></div><canvas width="640" height="290" style="width: 100%; height: 100%;"></canvas></button></p>
<p>In coming releases .NET Hot Reload will also be available for Android, iOS, and macOS, and we’ll be integrating XAML Hot Reload and the Live Visual Tree as well.</p>
<p>To learn more about Hot Reload check out <a href="https://aka.ms/build2021-hotreload" target="_blank">Introducing .NET Hot Reload</a>.</p>
<h2 id="ecosystem-readiness">Ecosystem Readiness<a aria-labelledby="ecosystem-readiness" class="linkicon" href="#ecosystem-readiness"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/telerik-maui.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/telerik-maui.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABmAQMAAAAH5KYcAAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAFElEQVQ4jWNgGAWjYBSMglEwWAAABZQAAVd0RNMAAAAASUVORK5CYII=" alt="Image telerik maui" width="471" height="480" class="aligncenter size-full wp-image-33102 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/telerik-maui.png 471w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/telerik-maui-294x300.png 294w" sizes="(max-width: 471px) 100vw, 471px"></a></p>
<p>One of the major advantages of using .NET is leveraging a rich ecosystem of controls and libraries for building apps. With Preview 4 the Telerik team has released their first set of controls for .NET MAUI at <a href="https://www.telerik.com/maui-ui" rel="noopener" target="_blank">https://www.telerik.com/maui-ui</a>. Check out their <a href="https://www.telerik.com/blogs/aloha-from-telerik-ui-for-maui" rel="noopener" target="_blank">full announcement here</a>.</p>
<blockquote><p>“Since the very early days of .NET MAUI, our team has been thrilled about the concept behind its multi-platform capabilities! This will be a new era for .NET developers, and we are excited to partner with Microsoft in this journey.” said Stefan Stefanov, Director of Product Management at Progress. “The early preview version of Telerik UI for MAUI provides the .NET developer community with professionally designed, feature rich UI components to kickstart their cross-platform development and deliver stunning applications.”</p></blockquote>
<p>Other component vendors are also planning .NET MAUI support such as <a href="https://www.syncfusion.com/blogs/blog/advantages-net-maui-over-xamarin.aspx" rel="noopener" target="_blank">Syncfusion</a>, <a href="https://community.devexpress.com/blogs/mobile/archive/2021/05/13/xamarin-forms-are-available-free-of-charge-transition-to-net-multi-platform-app-ui-maui.aspx" rel="noopener" target="_blank">DevExpress</a>, and <a href="https://mauikit.com/" rel="noopener" target="_blank">GrialKit</a>.</p>
<p>What about your favorite open-source libraries? Dan Siegel has already shared an <a href="https://github.com/dansiegel/Prism.Maui" rel="noopener" target="_blank">early preview of Prism</a>, a popular MVVM library.</p>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet-1024x1003.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABiAQMAAACcdeQKAAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAFElEQVQ4jWNgGAWjYBSMglFAbQAABVwAAZ7DmE4AAAAASUVORK5CYII=" alt="Image prism tweet" width="640" height="627" class="aligncenter size-large wp-image-33100 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet-1024x1003.png 1024w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet-300x294.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet-768x753.png 768w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/prism-tweet.png 1192w" sizes="(max-width: 640px) 100vw, 640px"></a> </p>
<p>We host a monthly community call to help maintainers bring their libraries to .NET 6 and .NET MAUI. If you would like to participate, send an email to david.ortinau@microsoft.com.</p>
<h2 id="get-started-today">Get Started Today<a aria-labelledby="get-started-today" class="linkicon" href="#get-started-today"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p>Check out .NET MAUI today. Get started quickly be running the <code class=" prettyprinted" style=""><span class="pln">maui</span><span class="pun">-</span><span class="pln">check</span></code> .NET tool from the command line to install .NET 6 Preview and all the SDK dependencies you need for developing .NET MAUI apps.</p>
<blockquote><p>
Don’t have maui-check? Run this from your command line:</p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="pln">dotnet tool install </span><span class="pun">-</span><span class="pln">g </span><span class="typ">Redth</span><span class="pun">.</span><span class="typ">Net</span><span class="pun">.</span><span class="typ">Maui</span><span class="pun">.</span><span class="typ">Check</span></pre>
</blockquote>
<p>Run <code class=" prettyprinted" style=""><span class="pln">maui</span><span class="pun">-</span><span class="pln">check</span></code> and follow the instructions.</p>
<p>Open <a href="https://visualstudio.microsoft.com/vs/preview/" target="_blank">Visual Studio 2019 16.11 Preview 1</a> and create a new .NET Multi-platfrom App UI project.</p>
<p><a href="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/new-project-dialog.png" data-featherlight="image"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/new-project-dialog.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABCAQMAAACb2eE8AAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEUlEQVQokWNgGAWjYBQMRgAAA5wAAa0XA/wAAAAASUVORK5CYII=" alt="Image new project dialog" width="1025" height="679" class="aligncenter size-full wp-image-33041 lazyload" data-srcset="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/new-project-dialog.png 1025w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/new-project-dialog-300x199.png 300w, https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/05/new-project-dialog-768x509.png 768w" sizes="(max-width: 1025px) 100vw, 1025px"></a></p>
<p>The new solution format includes the multi-targeted project which runs on Android, iOS, and macOS, and the two WinUI projects for Windows. In future releases, the WinUI projects will be absorbed into the multi-targeted project.</p>
<p>The .NET MAUI and AndroidX packages are temporarily on a hosted feed. Once we have those packages bundled as a workload this step will no longer be needed. Run the following terminal commands to add the required source. </p>
<pre class="prettyprint prettyprinted" tabindex="0" style=""><span class="pln">dotnet </span><span class="kwd">new</span><span class="pln"> nugetconfig

dotnet nuget </span><span class="kwd">add</span><span class="pln"> source </span><span class="pun">-</span><span class="pln">n maui</span><span class="pun">-</span><span class="pln">preview https</span><span class="pun">:</span><span class="com">//aka.ms/maui-preview/index.json</span></pre>
<p>To run for Android, set the multi-targeted project as your startup project and select the Android platform from the Run menu to see your Android emulators.</p>
<blockquote><p>Android emulators – if this is your first run, you may be asked to create your own emulator before the app will deploy and run.</p></blockquote>
<p>In coming releases we will enable <a href="https://docs.microsoft.com/xamarin/xamarin-forms/deploy-test/hot-restart" target="_blank">iOS on Windows support</a> for developing from Visual Studio to your connected iOS device.</p>
<p>For additional information about getting started with .NET MAUI, refer to our <a href="https://github.com/dotnet/maui/wiki/Getting-Started" target="_blank">wiki documentation</a> on GitHub.</p>
<h2 id="feedback-welcome">Feedback Welcome<a aria-labelledby="feedback-welcome" class="linkicon" href="#feedback-welcome"><i class="fabric-icon fabric-icon--Link" aria-hidden="true"></i></a></h2>
<p>Please let us know about your experiences using .NET MAUI Preview 4 to create new applications by engaging with us on GitHub at <a href="https://github.com/dotnet/maui" target="_blank">dotnet/maui</a>.</p>
<p>For a look at what is coming in future releases, visit our <a href="https://github.com/dotnet/maui/wiki/roadmap" target="_blank">product roadmap</a>.</p>
        
        <div class="row justify-content-center">
                </div>

		        
        <div style="clear: both; padding-bottom: 10px;"></div>
        <div class="authorinfoarea" style="margin: 30px 0;padding: 24px 0;border-top:1px #A6A6A6 solid;">

        <div class="blog-authoravatar" style="float:left; margin-right:20px;"><img data-src="https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2021/04/davidortinau-150x150.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEXW1taWrGEgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAFElEQVQ4jWNgGAWjYBSMglFATwAABXgAAfmlXscAAAAASUVORK5CYII=" width="96" height="96" alt="David Ortinau" class="avatar avatar-96 wp-user-avatar wp-user-avatar-96 alignnone photo lazyload"></div>
            <h5 class="blog-authorname">
                <a class="no-underline" aria-label="David Ortinau" href="https://devblogs.microsoft.com/dotnet/author/davidortinau/">
                    David Ortinau                </a>
            </h5>
        <div class="social-links">
        
        <p>
            Principal Program Manager, .NET Multi-platform App UI        </p>
    
                    
        <p>
            <strong>Follow </strong>
                <a class="no-underline stayinformed" aria-label="David Ortinau Twitter profile" target="_blank" href="https://twitter.com/davidortinau">
        <i class="fa fa-twitter"></i>
    </a>
        <a class="no-underline stayinformed" aria-label="David Ortinau Linkedin profile" target="_blank" href="https://linkedin.com/in/davidortinau/">
        <i class="fa fa-linkedin"></i>
    </a>
        <a class="no-underline stayinformed" aria-label="David Ortinau Github profile" target="_blank" href="https://github.com/davidortinau">
        <i class="fa fa-github"></i>
    </a>
        <a class="no-underline stayinformed" aria-label="David Ortinau Website profile" target="_blank" href="https://youtube.com/c/davidortinau">
        <i class="fa fa-globe"></i>
    </a>
    <a class="no-underline stayinformed hvr-pop" aria-label="David Ortinau RSS Feed" target="_blank" href="https://devblogs.microsoft.com/dotnet/author/davidortinau/feed/">
    <i class="fa fa-rss"></i>
</a>

        </p>

        <div style="clear:both;"></div>
        
       </div>
       </div>
        
	</div><!-- .entry-content -->
    
    </div>
`;