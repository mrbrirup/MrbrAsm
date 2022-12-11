import { Mrbr_UI_Bootstrap_Controls_Scrollspy } from "../ui/bootstrap/controls/Scrollspy";

export class Mrbr_Tests_Application$Scrollspy {
  constructor() {
    const scrollspyCls = Mrbr_UI_Bootstrap_Controls_Scrollspy;
    document.body.innerHTML = `
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" >Section 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >Section 2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >Section 3</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="sections">
  <div class="container-fluid bg-success text-white" style="padding:100px 20px;">
    <h1>Section 1</h1>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  </div>
  
  <div class="container-fluid bg-warning" style="padding:100px 20px;">
    <h1>Section 2</h1>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  </div>
  
  <div class="container-fluid bg-secondary text-white" style="padding:100px 20px;">
    <h1>Section 3</h1>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
    <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
  </div>
  </div>`;
    let nav = document.getElementsByTagName("nav")[0],
      spied = <HTMLElement>document.getElementsByClassName("sections")[0];

    const scrollspy = new scrollspyCls("ss1", spied, nav);
    scrollspy.initialise()
      .then(() => {
        let links = document.querySelectorAll("a.nav-link"),
          sections = document.querySelectorAll("div.sections div.container-fluid");
        for (let i = 0; i < links.length; i++) {
          let link = links[i],
            section = sections[i];
          scrollspy.joinSpiedElements(<HTMLAnchorElement>link, <HTMLElement>section);
        }
        scrollspy.onScrollspy((e) => {
          console.log(e);
        });
        scrollspy.smoothScroll = true;
      });
    //scrollspy.attachScrollSpy("ss1", <HTMLElement>watched, <HTMLElement>nav);
  }
}