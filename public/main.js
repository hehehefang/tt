console.log('我是main.js');


// 不要用link去加载css   如何用ajax加载css
getCSS.onclick1 = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/style.css');  //请求css
    // 监听css是否成功或者失败    
    request.onload = () => {
        console.log(request.response);    //得到的响应   css的字符串
        //创建style
        const style = document.createElement('style');
        //填写style的内容
        style.innerHTML = request.response
        //插入到head里面
        document.head.appendChild(style)
    };
    request.onerror = () => {
        console.log('失败');
    };
    // 发送这个请求
    request.send();
}

// 用Ajax加载js

getJS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/2.js');

    request.onload = () => {
        const script = document.createElement('script');

        script.innerHTML = request.response;

        document.body.appendChild(script);

    };
    request.onerror = () => {

    };
    request.send();
}


//用Ajax加载html   之前是做不到的   只能通过link请求css js   但是不能请求html

getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/1.html');
    request.onload = () => {
        console.log(request.response);
        const div = document.createElement('div');
        div.innerHTML = request.response;
        document.body.appendChild(div);
    };
    request.onerror = () => {

    };
    request.send();
}


//onerror不是很好的兼容Ajax  改用onreadystatechange监听   重写css


// 就是把onload换成 改用onreadystatechange监听  因为onload不能很好的监听失败
// 
getCSS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/style.css');  //请求css
    // 监听css是否成功或者失败    
    request.onreadystatechange = () => {
        console.log(request.readyState);    //得到的响应状态   一般只关心他是否下载完成4  不关心下载中3
        //request.readyState === 4  你不知道是成功下载完了 还是把失败下载完了   成功是 2xx  失败 4xx 5xx
        if (request.readyState === 4) {
            //对状态码进行判断
            if (request.status >= 200 && request.status < 300) {
                //创建style
                const style = document.createElement('style');
                //填写style的内容
                style.innerHTML = request.response
                //插入到head里面
                document.head.appendChild(style)

            } else {
                alert('页面下载失败');
            }
        }
    };
    //如果路径错了怎么办
    request.onerror = () => {
        console.log('失败');
    };

    // 发送这个请求
    request.send();
}

