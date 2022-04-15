import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() planetId: string;

  postList: IPost[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadPostList(this.planetId, 3).subscribe(postList => {
      this.postList = postList;
    })
  }

}
