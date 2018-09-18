let str1 = ` /* 
    * 面试官你好，我是XXX
    * 只用文字作做我介绍太单调了
    * 我就用代码来介绍吧
    * 首先准备一些样式
    */

    * {
        transition: all 1s
    }
    body {
        background: #455A64;
        font-size: 15px;
    }
    #code {
        border: 1px solid #aaa;
        background-color: #CFD8DC;
        padding: 15px;
        overflow: scroll;
        padding-bottom: 100px;
    }

    /* 我们给代码加上高亮效果 */

    .token.selector {
        color: #690
    }
    .token.property {
        color: #905;
    } 

`
let str2 = `
    /* 我需要一张白纸来写我的简历 */

    #code {
        position: fixed; 
        left: 0; 
        width: 40%; 
        height: 100%;
        margin: 15px;

        /* 给左边加个呼吸效果 */

        animation: breathing 2s infinite;
    }
    #paper > .content {
        display: block;
    }

    /* 
    * ok 
    * 于是我就可以在白纸上写字了，请看右边 
    */

`
let md = `
# 自我介绍
----
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
----
熟悉 JavaScript CSS
# 项目介绍
----
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 项目介绍
----
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 项目介绍
----
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
----
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
----
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx


`

let str3 = ` 
    /* 
    * 接下来用一个优秀的库 marked.js
    * 把 Markdown 变成 HTML
    */
`

let str4 = ` 
    /* 再给HTML加点样式 */

    .content {
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        padding: 20px 10px;
    }
    .content h1, .content h2, .content h3 {
        color: #333;
        padding-top: 10px;
    }
    .content li {
        margin: 5px 20px;
    }
    .content h1, .content h2, .content h3 {
        margin: 0;
    }
    .content ul, .content ol, .content p {
        margin: 0;
    }
  
    /* 
    * 完成
    * 感谢您的观看
    */

    
`

writeCode('', str1, () => {
    createPaper(() => {
        writeCode(str1, str2, () => {
            writeMarkdown(md, () => {
                writeCode(str1 + str2, str3, () => {
                    markdownToHTML(md, () => {
                        writeCode(str1 + str2 + str3, str4)
                    })
                })
            })
        })
    })
})

function writeCode(prev, str, fn) {
    let n = 0
    let timer = setInterval(() => {
        n += 1
        code.innerHTML = Prism.highlight(prev + str.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prev + str.substring(0, n)
        code.scrollTop = code.scrollHeight

        if (n >= str.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 25)
}

function createPaper(fn) {
    let paper = document.createElement('div')
    paper.id = 'paper'
    let content = document.createElement('pre')
    content.className = 'content'
    document.body.appendChild(paper)
    paper.appendChild(content)
    fn && fn.call()
}

function writeMarkdown(md, fn) {
    let content = document.querySelector('.content')
    let n = 0
    let timer = setInterval(() => {
        n += 1
        content.innerHTML = md.substring(0, n)
        content.scrollTop = content.scrollHeight

        if (n >= md.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 25)
}

function markdownToHTML(md, fn) {
    let content = document.querySelector('.content')
    content.scrollTop = 0
    content.innerHTML = marked(md)
    fn && fn.call()
}