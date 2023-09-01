import { Component, OnInit, Output, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router';
import { PoseService } from '../../../core/services/pose.service';
import { Pose } from '../../../models/pose';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  lista: Category[] = [];
  listaPoses: Pose[] = [];
  poseClicked: Pose = {} as Pose;
  categoryClicked: Category = {} as Category;
  categories$!: Observable<Category[]>;

  constructor(
    private catService: CategoryService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.categories$! = catService.getAllCategories();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {}

  // getCategoryFromUserClickOnLista(categoryClicked: Category) {
  //   this.poseService.setCategoryNavbar(categoryClicked);
  // }

  sendPosesOnClick(clicked: Pose[]): void {
    console.log(clicked);
    this.listaPoses = clicked;
  }

  sendPoseOnClick(clicked: Pose): void {
    console.log(clicked);
    this.poseClicked = clicked;
  }
}
