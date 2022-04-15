import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet, IPost, IUser } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-details',
  templateUrl: './planets-details.component.html',
  styleUrls: ['./planets-details.component.css']
})
export class PlanetsDetailsComponent implements OnInit {
  planet: IPlanet<IPost>;

  @Input() planetId: string;
  @Input() postId: string;

  isEdited: boolean = false;
  @ViewChild('editPostForm') editPostForm: NgForm


  postList: IPost;

  newPlanetReq$ = new BehaviorSubject(undefined);

  canSubscribe: boolean = false;
  currentUser?: IUser;
  currentPost?: IPost;
  isUserOwner: boolean = false;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const planetId = params['planetId'];
            return this.newPlanetReq$.pipe(mergeMap(() => this.planetService.loadPlanetById(planetId)))
          })
        ),
      this.authService.currentUser$
    ])
      .subscribe(([planet, user]) => {
        this.currentUser = user
        this.planet = planet;
        this.canSubscribe = user && !this.planet.subscribers.includes(user?._id);
      });

    // const planetId = this.activatedRoute.snapshot.params['planetId'];
    // this.planetService.loadPlanetById(planetId).subscribe(planet=>{
    //   this.planet = planet;
    //   this.canSubscribe = !this.planet.subscribers.includes('5fa64b162183ce1728ff371d');
    // });

    // this.planetService.editPost$(this.planetId, this.postId, this.editPostForm.value).subscribe(postList => {
    //   this.postList = postList;
    // });
  }

  public canLike(comment: IPost) {
    return this.currentUser && !comment.likes.includes(this.currentUser._id);
  }

  subscribe(): void {
    this.planetService.subscribeToPlanet(this.planet._id)
      .subscribe(() => this.newPlanetReq$.next(undefined));
  }

  unsubscribe(): void {
    this.planetService.unsubscribe(this.planet._id)
      .subscribe(() => this.newPlanetReq$.next(undefined));
  }

  like(comment: IPost): void {
    this.planetService.likePost(comment._id).subscribe(() => this.newPlanetReq$.next(undefined));
  }

  unlike(comment: IPost): void {
    this.planetService.dislikePost(comment._id).subscribe(() => this.newPlanetReq$.next(undefined));
  }




  // editPost(currentPost: IPost): void {
  //   this.isEdited = true;

  //   setTimeout(() => {
  //     this.editPostForm.form.patchValue({
  //       text: this.currentPost.text,
  //     })
  //   });

  // }

  // updatePost(editPostForm: NgForm): void {
  //   this.planetService.editPost$(this.planetId, this.postId, this.editPostForm.value).pipe().subscribe({
  //     next: (currentPost) => {
  //       this.currentPost = currentPost;
  //       this.isEdited = false;
  //       window.location.reload();
  //     },
  //     error: () => {
  //       this.router.navigate(['/home']);
  //     }
  //   })
  // }
}