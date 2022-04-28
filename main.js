quick_draw_data_set=["book", "airplane", "mobile", "pen", "board" ];
random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_to_draw').innerHTML = 'Sketch To be Drawn: ' + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
 function updatecanvas()
 {
     background("white");
     random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
     console.log(quick_draw_data_set[random_number]);
     sketch = quick_draw_data_set[random_number];
     document.getElementById("sketch-to-draw").innerHTML = "sketch_to_be_drawn" + sketch;
 }

 function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function setup()
{
    canvas =  createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function draw()
{
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if (drawn_sketch == sketch)
    {
        answer_holder = "set";
        score++;
        document.getElementById("score").innerHTML = 'Score:' + score;
    }
    
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById("label").innerHTML='your Sketch: ' + drawn_sketch;;
    document.getElementById("confidence").innerHTML=Math.round(results[0].confidence*100)+" %";
}
function check_sketch()
{
    timer_counter++;
    document.getElementById("timer").innerHTML = 'timer:' +timer_counter;
    console.log(timer_counter);
    if(timer_counter > 400)
    {
        timer_counter = 0;
        timer_check = "completed";
    }

    if(timer_counter == "completed"||answer_holder == "set")
    {
         timer_check = "";
         answer_holder = "";
         updatecanvas();
    }
}
