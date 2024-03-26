import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {  
  // public blogId="65ffd6aabbdfc3eae78dc204";
  public blogId:any
  public blog:any
constructor(public route:ActivatedRoute,public http:HttpClient){
  this.route.params.subscribe(params => {
    this.blogId = params['id'];
    console.log(this.blogId)
  });
this.fetchdata();
}
fetchdata(){
   this.http.get<any>(`http://localhost:3000/api/getblogdetails?blogId=${this.blogId}`).subscribe((res)=>{console.log(res); this.blog=res.blog})
}

}
