const isBrowser = typeof window !== 'undefined'
const UA = isBrowser && window.navigator.userAgent.toLowerCase()
const isIOS = UA && /iphone|ipod|ipad|ios/.test(UA)

function isNative(constructor) {
    return /native code/.test(constructor.toString())
}

const nextTick = () => {
    const callbacks = []
    let pending = false
    let timerFunc

    function nextTickHandler() {
        pending = false
        const copies = callbacks.slice(0)
        callbacks.length = 0
        copies.map(copy => copy())
    }

    if(typeof Promise !== 'undefined' && isNative(Promise)) {
        let p = Promise.resolve()
        const logError = error => console.error(error)
        timerFunc = () => {
            p.then(nextTickHandler).catch(logError)
            if(isIOS) setTimeout(() => {})
        }
    }else if(typeof MutationObserver !== 'undefined' && isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]') {
        let counter = 1
        const observer = new MutationObserver(nextTickHandler)
        const textNode = document.createElementText(String(counter))

        observer.observe(textNode, {
            characterData: true
        })

        timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
        }
    }else {
        timerFunc = () => {
            setTimeout(nextTickHandler)
        }
    }
    return (cb, ctx) => {
        let _resolve
        callbacks.push(() => {
            if(cb) cb.call(ctx)
            if(_resolve) _resolve(ctx)
        })
        if(!pending) {
            pending = true
            timerFunc()
        }
        if(!cb && typeof Promise !== 'undefined') {
            return new Promise(resolve => _resolve = resolve)
        }
    }
}

export default nextTick()