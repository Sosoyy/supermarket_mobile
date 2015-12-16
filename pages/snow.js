/**
 * User: huyy
 * Date: 2015/12/1 0001
 * Time: ���� 4:54
 */
window.onload = function(){
    /*
     * ������ѩ snowFall
     * author��xuanfeng
     * time: 2014-01-11
     */
    // ������ѩ
    function snowFall(snow) {
        // ����������
        snow = snow || {};
        this.maxFlake = snow.maxFlake || 200;	//���Ƭ��
        this.flakeSize = snow.flakeSize || 10;	//ѩ����״
        this.fallSpeed = snow.fallSpeed || 2;	//׹���ٶ�
        this.status = 0;	//0-��ʼ����1-��ʼ��ѩ��2-ֹͣ��ѩ��3-��ͣ��ѩ��4-������ѩ
    }

    // ����д��
    requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) { setTimeout(callback, 1000 / 60); };
    cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame;

    // ��ʼ��ѩ
    snowFall.prototype.start = function(){
        if(this.status == 1 || this.status == 4){
            // �Ѿ�����ѩ��������
            return false;
        }
        this.status = 1;

        // ��������
        snowCanvas.apply(this);
        // ����ѩ����״
        createFlakes.apply(this);
        // ��ѩ
        drawSnow.apply(this)
    }

    // ֹͣ��ѩ
    snowFall.prototype.stop = function(){
        if(this.status == 2 || this.status == 0 || !this.canvas){
            return false;
        }
        // ֹͣ����ѭ��
        this.pause();
        this.status = 2;
        // ɾ������
        this.canvas.parentNode.removeChild(this.canvas);
        this.canvas = null;
    }

    // ��ͣ��ѩ
    snowFall.prototype.pause = function(){
        if(this.status == 3){
            return false;
        }
        this.status = 3;
        cancelAnimationFrame(this.loop)
    };
    // ������ѩ
    snowFall.prototype.resume = function(){
        if(this.status == 3 && this.canvas){
            this.status = 4;
            // �����ļ�ʱ����
            this.loop = requestAnimationFrame(function() {
                drawSnow.apply(that)
            });
        }
    };

    // ��������
    function snowCanvas() {
        // ���Dom���
        var snowcanvas = document.createElement("canvas");
        snowcanvas.id = "snowfall";
        snowcanvas.width = window.innerWidth;
        snowcanvas.height = window.innerHeight;
        snowcanvas.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 2999; pointer-events: none;");
        document.getElementsByTagName("body")[0].appendChild(snowcanvas);
        this.canvas = snowcanvas;
        this.ctx = snowcanvas.getContext("2d");
        // ���ڴ�С�ı�Ĵ���
        window.onresize = function() {
            snowcanvas.width = window.innerWidth;
            snowcanvas.height = window.innerHeight
        }
    }

    // ѩ�˶�����
    function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
        this.x = Math.floor(Math.random() * canvasWidth); 	//x����
        this.y = Math.floor(Math.random() * canvasHeight);	//y����
        this.size = Math.random() * flakeSize + 2;			//��״
        this.maxSize = flakeSize;							 //�����״
        this.speed = Math.random() * 1 + fallSpeed;		      //׹���ٶ�
        this.fallSpeed = fallSpeed;						  //׹���ٶ�
        this.velY = this.speed;							  //Y�����ٶ�
        this.velX = 0;									    //X�����ٶ�
        this.stepSize = Math.random() / 30;				    //����
        this.step = 0 									    //����
    }

    flakeMove.prototype.update = function() {
        var x = this.x,
            y = this.y;

        // ���Ұڶ�(����)
        this.velX *= 0.98;
        if (this.velY <= this.speed) {
            this.velY = this.speed
        }
        this.velX += Math.cos(this.step += .05) * this.stepSize;

        this.y += this.velY;
        this.x += this.velX;
        // �ɳ��߽�Ĵ���
        if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
            this.reset(canvas.width, canvas.height)
        }
    };

    // �ɳ��߽�-������˼���׹��
    flakeMove.prototype.reset = function(width, height) {
        this.x = Math.floor(Math.random() * width);
        this.y = 0;
        this.size = Math.random() * this.maxSize + 2;
        this.speed = Math.random() * 1 + this.fallSpeed;
        this.velY = this.speed;
        this.velX = 0;
    };

    // ��Ⱦѩ��-�����״
    flakeMove.prototype.render = function(ctx) {
        var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        snowFlake.addColorStop(0, "rgba(221, 171, 217, 0.9)");
        snowFlake.addColorStop(.5, "rgba(221, 171, 217, 0.5)");
        snowFlake.addColorStop(1, "rgba(221, 171, 217, 0)");
        ctx.save();
        ctx.fillStyle = snowFlake;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    // ����ѩ��-������״
    function createFlakes() {
        var maxFlake = this.maxFlake,
            flakes = this.flakes = [],
            canvas = this.canvas;
        for (var i = 0; i < maxFlake; i++) {
            flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
        }
    }

    // ��ѩ
    function drawSnow() {
        var maxFlake = this.maxFlake,
            flakes = this.flakes;
        ctx = this.ctx, canvas = this.canvas, that = this;
        // ���ѩ��
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var e = 0; e < maxFlake; e++) {
            flakes[e].update();
            flakes[e].render(ctx);
        }
        // һ֡һ֡�Ļ�
        this.loop = requestAnimationFrame(function() {
            drawSnow.apply(that);
        });
    }

    // ���ü����Ʒ���
    var snow = new snowFall({maxFlake:100});
    snow.start();

}
