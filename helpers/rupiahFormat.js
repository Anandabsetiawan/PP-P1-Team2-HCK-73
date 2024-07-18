function rupiahFormat(num) {
    let result = num.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
    
    return result
}

module.exports = rupiahFormat