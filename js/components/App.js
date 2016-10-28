import React, { Component } from 'react';
import NProgress from 'nprogress';


import { BASE } from '../constants/Base.js';


export default class App extends Component {
	constructor (props){
		super(props);
		this.state = {
			labels: null
		}
	}
	componentWillMount (){
		NProgress.configure({ showSpinner: false });
		this.baiduStatistics();
		this.duoshuoComments();
		$.ajax({
			url: 'json/labels.json',
			dataType: 'json',
			success: result => {
				window.LABELS = result;
				this.setState({
					labels: true
				})
			},
			error: msg => {
				console.log(msg);
			}
		})
	}
	baiduStatistics (){
		if (location.host.indexOf('hexson') >= 0){
			var _hmt = _hmt || [];
			(function(){
				var hm = document.createElement('script');
				var s = document.getElementsByTagName('script')[0];
				hm.src = '//hm.baidu.com/hm.js?' + BASE['baidu'];
				s.parentNode.insertBefore(hm, s);
			})();
		}
	}
	duoshuoComments (){
		window.duoshuoQuery = { short_name: BASE['duoshuo'] };
		(function(){
			var ds = document.createElement('script');
			ds.type = 'text/javascript';
			ds.async = true;
			ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
			ds.charset = 'UTF-8';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
		})();
	}
	render (){
		if (this.state.labels == null){
			return null;
		}else {
			return (
				<div>
					<div>{this.props.children}</div>
				</div>
			)
		}
	}
}