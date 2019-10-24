import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  persons:string;
  name: string;
  children?: FoodNode[];
}

const TREE_DATA:any  = [
  {
    name: 'Fruit',
    persons:'pepe',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    persons:'JP',
    children: [
      {
        name: 'Green',
        persons:'Jose',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        persons:'Roerto',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  idProceso:number;

  @Input() nombre:string;
  @Input() fechaInicio:string;
  @Input() fechaTermino:string;

  constructor(
    private activadedRoute:ActivatedRoute,
    private router:Router
  ) { 
    this.dataSource.data = TREE_DATA;

    this.activadedRoute.params.subscribe( params => {
      this.idProceso = params['id'];
    })
    this.activadedRoute.queryParams.subscribe(params => {
      this.nombre = params['n'];
      this.fechaInicio = params['fi'];
      this.fechaTermino = params['ft'];
  });
  }
 
  ngOnInit() {
    console.log('nombre');
    console.log(this.nombre);
  }

  volver(){
    this.router.navigateByUrl('/procesos');
  }


  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  
}
