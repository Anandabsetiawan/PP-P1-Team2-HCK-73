function rupiahFormat(num) {
    let result = num.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
    result = result.replace(",00", "");
    
    return result
}

module.exports = rupiahFormat