let str1 = ` /* 
    * 面试官你好，我叫季靖松
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
我叫 季靖松
1993 年 7 月出生
毕业于吉林大学
16届 电子科学与技术专业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
----
熟悉Vue.js框架、Vue全家桶
熟悉 HTML、CSS、JavaScript
熟悉 jQuery 常用 API ，如 DOM 操作、特效、事件等
掌握 Scss 、 Less 的使用
会使用 REM 、 vw / vh 、 媒体查询等技术制作适配手机设备的页面
掌握 HTTP 基础

# 项目介绍
----
1. Vue重构移动端商城
2. Vue实现todolist
3. 我的画板
4. 键盘网站导航
5. 会动的简历
6. 我的在线简历

# 项目介绍
----
1. Vue重构移动端商城
2. Vue实现todolist
3. 我的画板
4. 键盘网站导航
5. 会动的简历
6. 我的在线简历

# 联系方式
----
- QQ 787827925
- Email 787827925@qq.com
- 手机 17301157336

# 联系方式
----
- QQ 787827925
- Email 787827925@qq.com
- 手机 17301157336


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