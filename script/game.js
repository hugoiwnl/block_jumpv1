import Application from '../common/Application.js';

import Renderer from './Renderer.js';
import Physics from './Physics.js';
import Camera from './Camera.js';
import SceneLoader from './SceneLoader.js';
import SceneBuilder from './SceneBuilder.js';
const mat4 = glMatrix.mat4;
let scena=1;
let minuti=null;
let sekunde=null;
let window=false;
let fallen=false;
let first=true;
let end=false; 
let total_points=[];
let first1=true;
let pauzirano=false;
let pao_audio=false;
let nivo_audio=false;
let kraj_audio=false;


class App extends Application {

    start() {
        const gl = this.gl;

        this.renderer = new Renderer(gl);
        this.startTime = this.time;
        this.aspect = 1;
        this.gravity=-0.05;
        this.moving1=-23.5;
        this.gore1=true;
        this.moving2=-3;
        this.gore2=true;
        this.moving3=3;
        this.gore3=true;
        this.moving4=-33.5;
        this.gore4=true;
        let activator1=false;
        let activator2=false;
        this.moving5=-0.8;
        this.gore5=true;
        this.moving6=4.5;
        this.gore6=true;
        this.moving7=3.5;
        this.gore7=true;
        this.moving8=11.5;
        this.gore8=true;
        let activator3=false;
        let activator4=false;
        this.moving9=-27.5;
        this.gore9=true;
        this.moving10=13.5;
        this.gore10=true;
        this.moving11=-46.5;
        this.gore11=true;
        this.moving12=5.5;
        this.gore12=true;
        this.moving13=20;
        this.gore13=true;
        this.moving14=26;
        this.gore14=true;
        this.krajm1=-10;
        this.gorek1=true;
        this.krajm2=5;
        this.gorek2=true;
        this.krajm3=0;
        this.gorek3=true;
        this.dodgem=-10.5;
        this.dodgegore=true;
        let activator5=false;
        this.movecam=-4;
    
        this.pointerlockchangeHandler = this.pointerlockchangeHandler.bind(this);
        document.addEventListener('pointerlockchange', this.pointerlockchangeHandler);
        var myAudio=document.createElement("audio");
        myAudio.src="../common/audio/background-techno1.mp3";
        document.addEventListener("click", ()=> {
            this.canvas.requestPointerLock();
            if(first1){
                myAudio.play();
                first1=false;
            }
            
        });
        document.addEventListener("keypress", (e)=> {
            if(e.key=="m"){
                if(pauzirano){
                    myAudio.play();
                    pauzirano=false;
                }else{
                    myAudio.pause();
                    pauzirano=true;
                }
            }
            
        });
        this.clock();
        
        this.load('loadingscreen.json');
        
        


    }
    async load(uri) {
        
        
        if(fallen){
            this.click_to_start();
            document.addEventListener("click", ()=> {
                this.clicked();
            });
            fallen=false;
        }
        if(uri=="scene.json" && first){
            //setTimeout(this.click_to_start(), 3000);
            this.click_to_start();
            document.addEventListener("click", ()=> {
                this.clicked();
            });
            first=false;
        }
        if(uri=="loadingscreen.json"){
            this.clock1();
        }
        
        const scene = await new SceneLoader().loadScene(uri);
        const builder = new SceneBuilder(scene);
        this.scene = builder.build();
        this.physics = new Physics(this.scene);
        


        // Find first camera.
        this.camera = null;
        this.scene.traverse(node => {
            if (node instanceof Camera) {
                this.camera = node;
            }
        });
        this.camera.aspect = this.aspect;
        this.camera.updateProjection();
        this.renderer.prepare(this.scene);

        if(this.physics){
            this.physics.skupljeniZeleni=0;
        }
        if(uri=='scene.json'){
            scena=1;
            this.scene.traverse(node => {
                if(node.translation[1]==2.3 && node.translation[2]==-24){
                    this.moving_object1=node;
                }
                if(node.translation[0]==-3 && node.translation[2]==-30.5){
                    this.moving_object2=node;
                }
                
                if(node.translation[0]==3 && node.translation[2]==-30.5){
                    this.moving_object3=node;
                }
                if(node.translation[0]==0 && node.translation[2]==-33.5){
                    this.moving_object4=node;
                }
                
                
                
                
            });
            
            
            
        }else if(uri=='scene1.json'){
            scena=2;
            this.scene.traverse(node =>{
                if(node.translation[0]==-0.8 && node.translation[1]==4.4){
                    this.moving_pyramid1=node;
                }
                if(node.translation[0]==4.5 && node.translation[1]==4.4){
                    this.moving_pyramid2=node;
                }
                if(node.translation[0]==-5 && node.translation[1]==3.5){
                    this.moving_block1=node;
                }
                if(node.translation[0]==11.5 && node.translation[1]==7){
                    this.moving_block2=node;
                }
                if(node.translation[0]==-5 && node.translation[2]==-27.5){
                    this.moving_block3=node;
                }
                //kraj
                if(node.translation[0]==-10 && node.translation[2]==-38.5 && node.translation[1]==5){
                    this.kraj1=node;
                }
                if(node.translation[0]==-5 && node.translation[2]==-42.5 && node.translation[1]==5){
                    this.kraj2=node;
                }
                if(node.translation[0]==0 && node.translation[2]==-46.5 && node.translation[1]==5){
                    this.kraj3=node;
                }
            })
        }else if(uri=='scene2.json'){
            scena=3;
            this.scene.traverse(node =>{
                if(node.translation[0]==13.5 && node.translation[2]==-38.5){
                    this.scene2_moving=node;
                }
                if(node.translation[0]==-6 && node.translation[2]==-46.7){
                    this.scene2_moving1=node;
                }
                if(node.translation[0]==-2 && node.translation[2]==-54.2){
                    this.scene2_moving2=node;
                }
                if(node.translation[0]==20 && node.translation[2]==-31.5){
                    this.flamebox1=node;
                }
                if(node.translation[0]==26 && node.translation[2]==-36.5){
                    this.flamebox2=node;
                }
                if(node.translation[0]==-13 && node.translation[2]==-10.5 && node.translation[1]==6){
                    this.dodge=node;
                }
                
                
            })
        }
        if(uri=="loadingscreen.json"){
            scena=0; 
        }
        
    }

    enableCamera() {
        this.canvas.requestPointerLock();
    }

    pointerlockchangeHandler() {
        if (!this.camera) {
            return;
        }

        if (document.pointerLockElement === this.canvas) {
            this.camera.enable();
        } else {
            this.camera.disable();
        }
    }

    update() {
        let gc=document.getElementById("green_counter");
        let goldc=document.getElementById("gold_counter");
        let level=document.getElementById("level");
        level.innerHTML="LEVEL "+scena;
        
        
        if(this.physics){
            gc.innerHTML="Green blocks collected: "+this.physics.zeleniCounter();
            goldc.innerHTML="Gold blocks collected: "+this.physics.zlatniCounter();
        }
        const t = this.time = Date.now();
        const dt = (this.time - this.startTime) * 0.001;
        this.startTime = this.time;
        
        // y izmedju 3.9 i 4, 
        if (this.camera) {
            this.camera.update(dt);
        }

        if (this.physics) {
            this.physics.update(dt);
        }
        
        if(scena==1){
            if(this.moving_object1){
                let m1=this.moving_object1.transform;
                mat4.fromTranslation(m1,[0, 2.3, this.moving1]);
                mat4.scale(m1,m1,[0.7,0.1,0.7]);
            }
            if(this.moving_object2){
                let m2=this.moving_object2.transform;
                mat4.fromTranslation(m2,[this.moving2, 2.3, -30.55]);
                mat4.scale(m2,m2,[0.7,0.1,0.7]);
            }
            if(this.moving_object3){
                let m3=this.moving_object3.transform;
                mat4.fromTranslation(m3,[this.moving3,2.3,-30.5]);
                mat4.scale(m3,m3,[0.7,0.1,0.7]);
            }
            if(this.moving_object4){
                let m4=this.moving_object4.transform;
                mat4.fromTranslation(m4,[0,2.3,this.moving4]);
                mat4.scale(m4,m4,[0.7,0.1,0.7]);
            }
        }
        if(scena==2){
            //this.myAudio.pause();
            if(this.moving_pyramid1){
                let p1=this.moving_pyramid1.transform;
                mat4.fromTranslation(p1,[this.moving5,4.4,-16]);
                mat4.scale(p1,p1,[1,0.7,1]);
            }
            if(this.moving_pyramid2){
                let p2=this.moving_pyramid2.transform;
                mat4.fromTranslation(p2,[this.moving6,4.4,-19]);
                mat4.scale(p2,p2,[1,0.7,1]);
            }
            if(this.moving_block1){
                let b1=this.moving_block1.transform;
                mat4.fromTranslation(b1,[-5,this.moving7,-23]);
                mat4.scale(b1,b1,[1,0.1,1]);
            }
            if(this.moving_block2){
                let b2=this.moving_block2.transform;
                mat4.fromTranslation(b2,[this.moving8,7,-27]);
                mat4.scale(b2,b2,[1,0.1,1]);
            }
            if(this.moving_block3){
                let b3=this.moving_block3.transform;
                mat4.fromTranslation(b3,[-5,5.5,this.moving9]);
                mat4.scale(b3,b3,[1,0.1,1]);
            }
            if(this.kraj1){
                let k1=this.kraj1.transform;
                mat4.fromTranslation(k1,[this.krajm1,5,-38.5]);
                mat4.scale(k1,k1,[2.5, 1, 2.5]);
            }
            if(this.kraj2){
                let k2=this.kraj2.transform;
                mat4.fromTranslation(k2,[-5, this.krajm2, -42.5]);
                mat4.scale(k2,k2,[2.5, 1, 2.5]);
            }
            if(this.kraj3){
                let k3=this.kraj3.transform;
                mat4.fromTranslation(k3,[this.krajm3, 5, -46.5]);
                mat4.scale(k3,k3,[2.5, 1, 2.5]);
            }
        }
        if(scena==3){
            if(this.scene2_moving){
                let s1=this.scene2_moving.transform;
                mat4.fromTranslation(s1,[this.moving10, 8.5, -38.5]);
                mat4.scale(s1,s1,[0.7, 0.1, 1]);
            }
            if(this.scene2_moving1){
                let s2=this.scene2_moving1.transform;
                mat4.fromTranslation(s2,[-6,5,this.moving11]);
                mat4.scale(s2,s2,[0.7, 0.1, 0.7]);
            }
            if(this.scene2_moving2){
                let s3=this.scene2_moving2.transform;
                mat4.fromTranslation(s3,[-2,this.moving12,-54.2]);
                mat4.scale(s3,s3,[0.7, 0.1, 0.7]);
            }
            if(this.flamebox1){
                let f1=this.flamebox1.transform;
                mat4.fromTranslation(f1,[this.moving13, 8.4, -31.5]);
                mat4.scale(f1,f1,[0.5, 0.4, 0.5]);
            }
            if(this.flamebox2){
                let f2=this.flamebox2.transform;
                mat4.fromTranslation(f2,[this.moving14, 9.2, -36.5]);
                mat4.scale(f2,f2,[0.5, 0.4, 0.5]);
            }
            if(this.dodge){
                let d1=this.dodge.transform;
                mat4.fromTranslation(d1,[-13, 6, this.dodgem]);
                mat4.scale(d1,d1,[3, 0.2, 1]);
            }
            
           
        }
        if(scena==0){
            if(this.camera){
                let c1=this.camera.transform;
                mat4.fromTranslation(c1,[0, 5, this.movecam]);
                mat4.rotateX(c1,c1,0.2);
            }
        }
        
        
    }

    render() {
        
        if(scena==1){
            if(this.camera){
                if(this.camera.translation[1]<0.5){
                    fallen=true;
                    this.load('scene.json');
                    this.fall_audio();
                    pao_audio=true;
                    

                }
                if(this.physics){
                    if(this.physics.zlatniCounter()==1){
                        this.activator1=true;
                    }
                }
                if(this.physics.zlatniCounter()==2){
                    this.activator2=true;
                }
            }
            
    
            if(this.moving1<-27.7){
                this.gore1=false;
            }
            if(this.moving1>-22.8 && !this.gore1){
                this.gore1=true;
            }
            if(this.gore1){
                this.moving1-=0.02;
            }else{
                this.moving1+=0.02;
            }
    
            if(this.moving2<-8.2){
                this.gore2=false;
            }
            if(this.moving2>-2.8 && !this.gore2){
                this.gore2=true;
            }
            if(this.gore2){
                this.moving2-=0.02;
            }else{
                this.moving2+=0.02;
            }
            
            if(this.activator1){
                if(this.moving3>8){
                    this.gore3=false;
                }
                if(this.moving3<2.8 && !this.gore3){
                    this.gore3=true;
                }
                if(this.gore3){
                    this.moving3+=0.02;
                }else{
                    this.moving3-=0.02;
                }
            }
            if(this.activator2){
                if(this.moving4<-41.7){
                    this.gore4=false;
                }
                if(this.moving4>-33.3 && !this.gore4){
                    this.gore4=true;
                }
                if(this.gore4){
                    this.moving4-=0.02;
                }else{
                    this.moving4+=0.02;
                }
            }
        }
        if(scena==2){

            if(this.camera){
                if(this.camera.translation[1]<0.5){
                    fallen=true;
                    this.load('scene1.json');
                    this.fall_audio();
                    pao_audio=true;
                }

                if(this.physics){
                    if(this.physics.zlatniCounter()==1){
                        this.activator3=true;
                    }
                }
                if(this.physics.zlatniCounter()==2){
                    this.activator4=true;
                }
            }
            
            if(this.moving5>4.5){
                this.gore5=false;
            }
            if(this.moving5<-0.5 && !this.gore5){
                this.gore5=true;
            }
            if(this.gore5){
                this.moving5+=0.02;
            }else{
                this.moving5-=0.02;
            }

            if(this.moving6<-0.5){
                this.gore6=false;
            }
            if(this.moving6>4.5 && !this.gore6){
                this.gore6=true;
            }
            if(this.gore6){
                this.moving6-=0.02;
            }else{
                this.moving6+=0.02;
            }

            if(this.moving7>10){
                this.gore7=false;
            }
            if(this.moving7<3.5 && !this.gore7){
                this.gore7=true;
            }
            if(this.gore7){
                this.moving7+=0.02;
            }else{
                this.moving7-=0.02;
            }

            if(this.moving8>15.5){
                this.gore8=false;
            }
            if(this.moving8<11 && !this.gore8){
                this.gore8=true;
            }
            if(this.gore8){
                this.moving8+=0.02;
            }else{
                this.moving8-=0.02;
            }
            
            if(this.krajm1>-1){
                this.gorek1=false;
            }
            if(this.krajm1<-10 && !this.gorek1){
                this.gorek1=true;
            }
            if(this.gorek1){
                this.krajm1+=0.035;
            }else{
                this.krajm1-=0.035;
            }

            if(this.krajm2>10){
                this.gorek2=false;
            }
            if(this.krajm2<1 && !this.gorek2){
                this.gorek2=true;
            }
            if(this.gorek2){
                this.krajm2+=0.035;
            }else{
                this.krajm2-=0.035;
            }

            if(this.krajm3<-10){
                this.gorek3=false;
            }
            if(this.krajm3>-1 && !this.gorek3){
                this.gorek3=true;
            }
            if(this.gorek3){
                this.krajm3-=0.035;
            }else{
                this.krajm3+=0.035;
            }

            if(this.activator3 && this.activator4){
                if(this.moving9<-33){
                    this.gore9=false;
                }
                if(this.moving9>-27.5 && !this.gore9){
                    this.gore9=true;
                }
                if(this.gore9){
                    this.moving9-=0.02;
                }else{
                    this.moving9+=0.02;
                }
            }
        }
        
        if(scena==3){
            if(this.camera){
                if(this.camera.translation[1]<0.5){
                    fallen=true;
                    this.load('scene2.json');
                    this.fall_audio();
                    pao_audio=true;
                }
            }
            if(this.physics){
                if(this.physics.zlatniCounter()==2){
                    this.activator5=true;
                }
            }
            if(this.moving10<0){
                this.gore10=false;
            }
            if(this.moving10>14 && !this.gore10){
                this.gore10=true;
            }
            if(this.gore10){
                this.moving10-=0.03;
            }else{
                this.moving10+=0.03;
            }

            if(this.moving11<-56){
                this.gore11=false;
            }
            if(this.moving11>-46 && !this.gore11){
                this.gore11=true;
            }
            if(this.gore11){
                this.moving11-=0.03;
            }else{
                this.moving11+=0.03;
            }
            if(this.activator5){
                if(this.moving12>15){
                    this.gore12=false;
                }
                if(this.moving12<5 && !this.gore12){
                    this.gore12=true;
                }
                if(this.gore12){
                    this.moving12+=0.03;
                }else{
                    this.moving12-=0.03;
                }
            }

            

            if(this.moving13>26){
                this.gore13=false;
            }
            if(this.moving13<20 && !this.gore13){
                this.gore13=true;
            }
            if(this.gore13){
                this.moving13+=0.03;
            }else{
                this.moving13-=0.03;
            }

            if(this.moving14<20){
                this.gore14=false;
            }
            if(this.moving14>26 && !this.gore14){
                this.gore14=true;
            }
            if(this.gore14){
                this.moving14-=0.03;
            }else{
                this.moving14+=0.03;
            }

            if(this.dodgem<-25){
                this.dodgegore=false;
            }
            if(this.dodgem>-9.5 && !this.dodgegore){
                this.dodgegore=true;
            }
            if(this.dodgegore){
                this.dodgem-=0.03;
            }else{
                this.dodgem+=0.03;
            }
        }

        if(scena==0){
            if(this.camera){
                this.movecam-=0.01;
            }
        }
        
        if (this.scene) {
            this.renderer.render(this.scene, this.camera);
        }
        
        //ovo je za nove levele
        
        if(this.camera){
            if(scena==1){
                
                if(this.camera.translation[0]>-5 && this.camera.translation[0]<-3 && this.camera.translation[1]>5.2 && this.camera.translation[1]<5.4 && this.camera.translation[2]>-50 && this.camera.translation[2]<-48){
                    this.load('scene1.json');                
                    this.level_end();   
                    window=true;
                    this.levelup_audio();
                    nivo_audio=true;
                }else{
                    this.level_not_end();
                }
            }
            if(scena==2){
                
                if(this.camera.translation[0]>-9.5 && this.camera.translation[0]<-7 && this.camera.translation[1]>6 && this.camera.translation[1]<6.15 && this.camera.translation[2]>-54 && this.camera.translation[2]<-52){
                    this.load('scene2.json');
                    this.level_end();
                    window=true;
                    this.levelup_audio();
                    nivo_audio=true;
                }
                if(window){
                    document.addEventListener("click", ()=> {
                        this.level_not_end();
                        window=false;
                    });
                }else{
                    this.level_not_end();
                }
            }
            if(scena==3){
                if(this.camera.translation[0]>9.2 && this.camera.translation[0]<11.6 && this.camera.translation[1]>20.7 && this.camera.translation[1]<20.9 && this.camera.translation[2]>-65.75 && this.camera.translation[2]<-63.4){
                    //this.canvas.exitPointerLock();
                    this.game_over();
                    end=true;
                    if(!kraj_audio){
                        this.finish_audio();
                        kraj_audio=true;
                    }

                }

                if(window){
                    document.addEventListener("click", ()=> {
                        this.level_not_end();
                        window=false;
                    });
                }else{
                    this.level_not_end();
                }
            }
            if(scena==0){
                if(this.movecam<-9.9){
                    this.load("scene.json");
                }
                this.level_not_end();
            }
            
        }
        if(scena==0){
            this.loadscreen();
            this.title();
            
        }else{
            if(!end){
                this.not_loadingscreen();
            }else{
                this.loadscreen();
            }
            this.no_title();
        }
        
    }
    
    fall_audio(){
        if(!pao_audio){
            var myAudio=document.createElement("audio");
            myAudio.src="../common/audio/game_over.ogg";
            myAudio.play();
        }
        
    }

    levelup_audio(){
        if(!nivo_audio){
            var myAudio=document.createElement("audio");
            myAudio.src="../common/audio/level_up.ogg";
            myAudio.play();
        }
        
    }

    finish_audio(){
        var myAudio=document.createElement("audio");
        myAudio.src="../common/audio/congratulations.ogg";
        myAudio.play();
    }

    level_end(){
        let window=document.getElementById("end_level");
        window.style.display="block";
        let complete=document.getElementById("level_complete");
        complete.style.display="block";
        if(this.physics){
            //green number
            let green=this.physics.zeleniCounter();
            let green_number=document.getElementById("green_number");
            green_number.innerHTML=green;
            green_number.style.display="block";
            //points number
            let points_number=document.getElementById("points_number");
            let minu=0;
            if(minuti!=0){
                minu=minuti*60;
            }
            let p=green*10+sekunde*2+minu*2;
            total_points.push(p);
            points_number.innerHTML=p;
            points_number.style.display="block";
        }
        //green count
        let green_complete=document.getElementById("green_complete");
        green_complete.style.display="block";
        //time
        let time_complete=document.getElementById("time_complete");
        time_complete.style.display="block";
        //time count
        let time_count=document.getElementById("time_number");
        time_count.innerHTML=minuti+":"+sekunde;
        time_count.style.display="block";
        //points
        let points_complete=document.getElementById("points_complete");
        points_complete.style.display="block";
        //next lvl
        let button=document.getElementById("button");
        button.style.display="block";
        //button onclick
        
    }
    level_not_end(){
        let window=document.getElementById("end_level");
        window.style.display="none";
        let complete=document.getElementById("level_complete");
        complete.style.display="none";
        let green_complete=document.getElementById("green_complete");
        green_complete.style.display="none";
        let green_number=document.getElementById("green_number");
        green_number.style.display="none";
        let time_complete=document.getElementById("time_complete");
        time_complete.style.display="none";
        let time_count=document.getElementById("time_number");
        time_count.style.display="none";
        let points_complete=document.getElementById("points_complete");
        points_complete.style.display="none";
        let points_number=document.getElementById("points_number");
        points_number.style.display="none";
        let button=document.getElementById("button");
        button.style.display="none";
    }
    
    click_to_start(){
        let click_start=document.getElementById("click_start");
        click_start.style.display="block";
    }
    clicked(){
        let click_start=document.getElementById("click_start");
        click_start.style.display="none";
        pao_audio=false;
        nivo_audio=false;
    }
    
    clock(){
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        
        
        setInterval(setTime, 1000);
        

        function setTime() {
        ++totalSeconds;
        sekunde = pad(totalSeconds % 60);
        minuti = pad(parseInt(totalSeconds / 60));
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
        }
    }

    clock1(){
        var start=document.getElementById("start_game");
        var totalSeconds=10;

        setInterval(setTime,1000);

        function setTime(){
            totalSeconds--;
            start.innerHTML="GAME STARTS IN "+totalSeconds;
        }
    }
    not_loadingscreen(){
        let greenc=document.getElementById("green_counter");
        let goldc=document.getElementById("gold_counter");
        let level=document.getElementById("level");
        let time=document.getElementById("counter");
        let controls=document.getElementById("instructions");
        let music=document.getElementById("mute");
        music.style.display="block";
        controls.style.display="block";
        time.style.display="block";
        greenc.style.display="block";
        goldc.style.display="block";
        level.style.display="block";
    }
    loadscreen(){
        let greenc=document.getElementById("green_counter");
        let goldc=document.getElementById("gold_counter");
        let level=document.getElementById("level");
        let time=document.getElementById("counter");
        let controls=document.getElementById("instructions");
        let music=document.getElementById("mute");
        music.style.display="none";
        controls.style.display="none";
        time.style.display="none";
        greenc.style.display="none";
        goldc.style.display="none";
        level.style.display="none";
    }

    title(){
        let title=document.getElementById("title");
        title.style.display="block";
        let description=document.getElementById("description");
        description.style.display="block";
        let start=document.getElementById("start_game");
        start.style.display="block";
    }
    no_title(){
        let title=document.getElementById("title");
        title.style.display="none";
        let description=document.getElementById("description");
        description.style.display="none";
        let start=document.getElementById("start_game");
        start.style.display="none";
    }
    game_over(){
        let over=document.getElementById("game_over");
        let congrats=document.getElementById("congrats");
        let total=document.getElementById("total");
        //points
        let green=this.physics.zeleniCounter();
        let minu=0;
        if(minuti!=0){
            minu=minuti*60;
        }
        let p=green*10+sekunde*2+minu*2;
        let totalp=p+total_points[0]+total_points[4];
        total.innerHTML="Total points: "+totalp;
        total.style.display="block";
        over.style.display="block";
        congrats.style.display="block";
    }
    not_game_over(){
        let over=document.getElementById("game_over");
        let congrats=document.getElementById("congrats");
        let total=document.getElementById("total");
        total.style.display="none";
        over.style.display="none";
        congrats.style.display="none";
    }

    

    resize() {
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        this.aspect = w / h;
        if (this.camera) {
            this.camera.aspect = this.aspect;
            this.camera.updateProjection();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const app = new App(canvas);
    
});
