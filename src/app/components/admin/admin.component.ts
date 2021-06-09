import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTab } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  routes = [
    {
      route: 'company',
      title: 'Kuruluş Bilgileri'
    },
    {
      route: 'departments',
      title: 'Departmanlar'
    },
    {
      route: 'teams', title: 'Ekipler',
    },
    {
      route: 'users',
      title: 'Kullanıcılar',
    },
    {
      route: 'tasks',
      title: 'Görevler',
    },
    {
      route: 'announcements',
      title: 'Duyurular',
    }
  ]

  activeLink = this.routes[0].route
  public lastActiveRoute = undefined;
  background: ThemePalette = undefined;
  constructor(private router: Router, private currentRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activeLink = this.currentRoute.snapshot.children[0].routeConfig.path.toString()
  }

  routeTo(route) {
    this.activeLink = route.route
    localStorage.setItem('lastActiveRoute', JSON.stringify(route))
    this.router.navigate(['admin/' + route.route])
  }

  reRoute(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  activeRoute(route){

  }

}
