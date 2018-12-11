const path = require('path')
const glob = require('glob')
/** 获取多页的入口脚本和模板 */
const getPages = (() => {
    const [
        globPathHtml,
        globPathJs,
        pages,
        tempSet
    ] = [
        ['./src/pages/**/index.html', 'template'], // 入口模板正则
        ['./src/pages/**/main.js', 'entry'], // 入口脚本正则
        Object.create(null),
        new Set()
    ]
    const getMultiPageConf = (globPath, keyName) => {
        let [fileList, tempArr, modName] = [glob.sync(globPath), [], null]
        if (fileList.length !== 0) {
            for (let entry of fileList) {
                tempArr = path.dirname(entry, path.extname(entry)).split('/')
                modName = tempArr[tempArr.length - 1]
                if (tempSet.has(modName)) {
                    Object.assign(pages[modName], {
                        [keyName]: entry,
                        'filename': `${modName}.html`
                    })
                } else {
                    Reflect.set(pages, modName, {
                        [keyName]: entry
                    }) && tempSet.add(modName)
                }
            }
            return true
        } else {
            if (keyName === 'template') {
                throw new Error('无法获取多页入口模板')
            } else if (keyName === 'entry') {
                throw new Error('无法获取多页入口脚本')
            } else {
                throw new Error('无法获取多页信息')
            }
        }
    }
    try {
        while (getMultiPageConf(...globPathHtml) && getMultiPageConf(...globPathJs)) return pages
    } catch (err) {
        console.log('获取多页数据错误：', err)
    }
})()
console.log('pages: ', getPages)

module.exports = {
    pages: getPages
}