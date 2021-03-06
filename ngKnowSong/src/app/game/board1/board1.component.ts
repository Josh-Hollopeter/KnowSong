import { SongstreamService } from './../../spotifyJSON/services/songstream.service';
import { UserService } from 'src/app/models/user.service';
import { GameHistory } from './../../models/game-history';
import { NgForm } from '@angular/forms';
import { DataService } from './../../injectable/data.service';
import { Artist } from './../../spotifyJSON/models/artist';
import { Track } from 'src/app/spotifyJSON/models/track';
import { Album } from 'src/app/spotifyJSON/models/album';
import { Quizmodel } from './../quiz/quizmodel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { MusixmatchService } from 'src/app/services/musixmatch.service';

export class AnswerKey {
  chosen: any;
  answer: any;
  question: any;
  correct: boolean;
  constructor(chosen: any, answer: any, question: any, correct: boolean) {
    this.chosen = chosen;
    this.answer = answer;
    this.question = question;
    this.correct = correct;
  }
}

@Component({
  selector: 'app-board1',
  templateUrl: './board1.component.html',
  styleUrls: ['./board1.component.css']
})
export class Board1Component implements OnInit {

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private data: DataService,
    private userSvc: UserService,
    private spotifySvc: SongstreamService,
    public lyricService: MusixmatchService
  ) { }

  ngOnInit(): void {
    if(!this.data.storage){
      this.router.navigateByUrl('createGame');
    }
    var artists = this.aroute.snapshot.paramMap.get("artists");
    this.questionBuilder();
  }
  // F I E L D S
  myarray: String[] = [];
  i: number = 0;
  categories: string[] = ["Name That Clip", "Lyric Match", "Release Year"];
  newstr: String;
  album = "Lemonade";
  year = 2014;
  roundOver: boolean;
  // quizQuestion = new Quizmodel(6, "Release Year", this.singerQuestion, [this.year, this.year +1, this.year +2, this.year -1], this.year )
  quizlist: Quizmodel[] = [];

  quizlength: number;
  selectedcategory: Quizmodel[] = [];
  question: string;
  selectedvalue: string;
  option: any[];
  selectedCategories: any[];
  selected;
  playdatclip: boolean;
  correct: boolean;
  marks: number = 0;
  answerkey: AnswerKey[] = [];
  trackNames = new Array;
  trackAnswers = new Array;
  gameHistory = new GameHistory();
  artistName;
  questionBuilder() {
    var questionInfo = this.data.storage;
    let j = 0;
    this.shuffle(questionInfo);
    questionInfo.forEach(element => {
      let singer = element.artist.name;
      this.artistName = singer;
      let singerQuestion = "What year was " + singer + " album " + element.name + " released?";
      var year = parseInt(element.releaseDate);
      var years = [year - 3, year - 1, year + 1, year];
      years = this.shuffle(years);
      if (this.quizlist.length <= 5) {
        this.quizlist.push({ ID: j, category: "Release Year", question: singerQuestion, anslistobj: years, answer: year });
        this.quizlist = this.removeDuplicates(this.quizlist, "question");
      }
      if (element.tracks) {
        this.trackNames = this.trackNames.concat(element.tracks);
        this.trackNames = this.shuffle(this.trackNames);
      }
    });
    this.quizlist = this.quizlist.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    for(let i =0 ; i < this.trackNames.length; i ++){
      this.trackNames= this.removeDuplicates(this.trackNames,"name");
    }
    this.makeDatClipBuilder();
    this.getLyricsFromMixer();


  }



  removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  makeDatClipBuilder() {
    var ansArray = Object.assign([], this.trackNames);
    let count = 0;
    let questionCounter = 0;
    for (let i = 0; i < this.trackNames.length; i++) {
      //remove duplicate from answer array and other
      this.trackNames = this.removeDuplicates(this.trackNames, "name");
      ansArray = this.removeDuplicates(ansArray, "name");
      let track = ansArray.pop();
      if (!track.previewUrl) {
        count++
        if (count === this.trackNames.length - 2) {
          this.categories.shift();
        }
        continue;
      }
      questionCounter++
      if (questionCounter == 7) {
        break;
      }
      this.trackAnswers = [track.name, this.trackNames[0].name, this.trackNames[0 + 1].name, this.trackNames[0 + 2].name];
      this.trackAnswers = this.shuffle(this.trackAnswers);
      this.quizlist.push({ ID: 0, category: "Name That Clip", question: track.previewUrl, anslistobj: this.trackAnswers, answer: track.name });

      this.trackNames = this.shuffle(this.trackNames);

    }
  }
  getQuestion() {
    document.getElementById("my-audio").setAttribute('src', this.question);
    return this.question;
  }

  //CHOOSING GAME STYLE
  //--------------------

  gettingCategory() {
    if (this.selectedvalue === "Name That Clip") {
      this.playdatclip = true;
    } else {
      this.playdatclip = false;
    } if (this.selectedvalue === 'Lyric Match') {
    }

    this.selectedCategories = this.quizlist.filter(d => (d.category == this.selectedvalue));
    if (this.selectedCategories.length === 0) {
      this.router.navigateByUrl("createGame");
    }

    this.i = 0;
    this.question = this.selectedCategories[this.i].question;
    this.option = this.selectedCategories[this.i].anslistobj;
    this.quizlength = this.selectedCategories.length - 1;
  }

  next() {
    if (this.i < this.selectedCategories.length - 1) {
      this.selected = null;
      ++this.i;
    }
    if (this.i === this.selectedCategories.length - 1) {
      this.roundOver = true;
      this.gameHistory.marks = this.marks;
      this.gameHistory.numQuestions = this.selectedCategories.length - 1;
      for (var i = 0; i < this.answerkey.length; i++) {
        this.gameHistory.chosenText += this.answerkey[i].chosen + "!!@";
        this.gameHistory.answerText += this.answerkey[i].answer + "!!@";;
        this.gameHistory.questionText += this.answerkey[i].question + "!!@";;
      }
      let user = new User();
      user.gameHistory = this.gameHistory;
      this.userSvc.updateUser(user).subscribe();

    }
    this.question = this.selectedCategories[this.i].question;
    this.option = this.selectedCategories[this.i].anslistobj;
  }
  // previous() {
  //   --this.i;
  //   this.question = this.selectedCategories[this.i].question;
  //   this.option = this.selectedCategories[this.i].anslistobj;
  // }

  check() {
    this.correct = false;
    this.generatemark();
    this.answerkey.push(new AnswerKey(this.selected, this.selectedCategories[this.i].answer, this.question, this.correct));
  }

  generatemark() {
    if (this.selected == this.selectedCategories[this.i].answer) {
      this.marks++;
      this.correct = true;
    }

  }
  submit() {
    this.roundOver = true;
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //-----------
  // GET LYRICS : 2,000 API calls per day. Be careful :)
  //-----------

  getLyricsFromMixer() {
    //get 100 tracks from shuffled track list

    var test: Track[] = this.trackNames;
    var hundredTracks = test.slice(0, 100); //100 max , works with less tracks

    var commaSeperatedTrackIds = "";
    for (let x = 0; x < hundredTracks.length; x++) {
      if (x == hundredTracks.length - 1) {
        // last track no comma
        commaSeperatedTrackIds += hundredTracks[x].id;
      } else {
        commaSeperatedTrackIds += hundredTracks[x].id + ",";
      }
    }

    //GET audio features from spotify api
    this.spotifySvc.getAudioFeaturesTracks(commaSeperatedTrackIds, localStorage.getItem('AccessToken')).subscribe(
      response => {
        var featuresArray = response["audio_features"];

        for (let x = hundredTracks.length - 1; x >= 0; --x) {
          let item = featuresArray[x];
          let lyrical = item["speechiness"];
          if (lyrical < .15) {
            //remove all tracks that are probably instrumental
            hundredTracks.splice(x, 1)
          }


        }
      }
    )

    var tracks = hundredTracks;
    //choose 5 tracks
    var lyricsToQuizOn = tracks.slice(0, 5);


    for (let x = 0; x < lyricsToQuizOn.length; x++) {
      //get name and artist to pass to lyric matcher api
      var trackName: string = lyricsToQuizOn[x].name;
      var artistName: string = this.artistName;  //possibly pulling multiple artist names fixed by using this artist name not track.album.artist.name

      this.lyricService.getLyrics(trackName, artistName).subscribe(
        response => {
          let message = response["message"];
          let body = message["body"];

          // check if the lyrics are not available  *Deprecated
          let length = body["length"];
          if (length == 0) {
            return; // go to next song (top of for loop)

            //get a new song
          }
          else {
            let message = response["message"];
            let body = message["body"];
            let lyrics = body["lyrics"];
            let lyricsBody = lyrics["lyrics_body"];

            //regex to get first 7 lines

            let lyricLines = lyricsBody.split('\n', 10);
            var finishedLyrics = "";
            for (let y = 0; y < lyricLines.length; y++) {
              if (!lyricLines[y].includes("**")) {
                if (y == 0) {
                  finishedLyrics += lyricLines[y];
                } else {
                  finishedLyrics += "\n";
                  finishedLyrics += lyricLines[y];
                }
              }
            }
            //put lyrics into corresponding track on the array
            let answers = [this.trackNames[0].name, this.trackNames[1].name, this.trackNames[2].name, trackName];
            this.shuffle(answers);
            if (!finishedLyrics) {
              return;
            }
            this.quizlist.push({ ID: 0, category: "Lyric Match", question: finishedLyrics, anslistobj: answers, answer: trackName });
            this.shuffle(this.trackNames);
            tracks[x].lyrics = finishedLyrics;
          }

        }
      )
    }//end for loop
    // }, 750);



  }


}



