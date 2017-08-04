import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
const API_KEY = 'AIzaSyBIfeh8rsST0QxtINBhlsFlDV6fgNCmpss';



//Create a new component. This component should produce some HTML
class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null 
        };

        this.videoSearch('Welcome to India');
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY,  term: term}, (videos) => {
            //   console.log(videos);
              this.setState({ 
                  videos:videos,
                selectedVideo: videos[0] });
            //   this.setState({videos: videos}); same as above
        })
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term)},300);

        return ( 
        <div >
            <SearchBar  onSearchTermChange={videoSearch}/>         
            <br/>   
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
               onVideoSelect={selectedVideo => this.setState({selectedVideo})}
               videos={this.state.videos}/> 
        </div>  );
    }
}

//Take this component's generated HTML and put it on the page(into the DOM)
ReactDOM.render( < App / > , document.querySelector('.container'));