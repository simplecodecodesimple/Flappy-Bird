// mình bắt đầu nhé hôm nay mic hư :)
var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');

var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
birdimg.src="images/bird.png";
hinhnenchinh.src="images/nenchinh.png";
ongtren.src="images/ongtren.png";
ongduoi.src="images/ongduoi.png";
// đầu tiên là nạp các hình vô nha các bạn :)
// bước 2 là tạo 1 số biến cần thiết

var score=0;
var khoangcachhaiong=140; // mình xin phép đặt tên tiếng việt để các bạn dễ hình dung
var khoangcachdenongduoi; // biến này là khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
// tạo ra 1 object chim với tọa độ x y là 1 nữa canvas
var bird={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong=[]; //tạo mảng ống để chứa các ống di chuỷen
ong[0]={
    x:canvas.width,
    y:0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

//tạo function để chạy trò chơi
function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        // mình lấy vị trí ống trên cộng khoảng cách đến
        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x-=5; //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if(ong[i].x ==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
                // ở đây mình sẽ làm video giải thích sau về
                // random này các bạn làm theo là được
            })
        }
        if(ong[i].x ==0 )ong.splice(0,1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
        //  bị đầy làm chậm       
        if(ong[i].x==bird.x)score++;  
        // giờ làm cái khó nhất là thua  
        if(bird.y+birdimg.height==canvas.height||
        bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
        && (bird.y<=ong[i].y+ongtren.height||
        bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
        ){
            return;
        }                   
    }
    // ok điều kiện đầu tiên là đụng đất
    // các bạn chú ý là tính tọa độ y cộng với độ cao con chim
    //  điều kiện thứ hai là so sánh vị trí x con chim
    // với cái ống 
    // và cuối cùng là so sánh vị trí y



    scoreshow.innerHTML="score: "+score;
    // cho bird rơi xuống
    bird.y+=3;
    requestAnimationFrame(run);
}
//thêm function cho nó bay lên khi nhấn
document.addEventListener("keydown",function(){
    bird.y-=60;   
})
// ok khá ổn 
// các bạn nhớ là tọa độ trên máy tính là ở gốc trên trái đi xuống dưới 
// là chiều dương nha
run();