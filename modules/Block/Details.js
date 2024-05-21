

module.exports = {
    parse($) { 
        
        let rows = $('#wrapper table.table:eq(0)>tbody>tr').toArray();

        let i = 0;

        let hash = $(rows[i++]).find('>td:eq(1)').text();
        let previous = $(rows[i++]).find('>td:eq(1)>a').text();
        let next = $(rows[i++]).find('>td:eq(1)>a').text();

        //原页面在 【Next Block】这一行缺少闭合标签，应该为 `</tr>`才对的，但原页面写成了开标签 `<tr>`。
        //导致相当于多了一个表格行，这里要在 i 加多一次。
        i++;

        let height = $(rows[i++]).find('>td:eq(1)').text().split(',').join('');
        let version = $(rows[i++]).find('>td:eq(1)').text();
        let merkle = $(rows[i++]).find('>td:eq(1)').text();
        let time = $(rows[i++]).find('>td:eq(1)').text();
        let difficulty = $(rows[i++]).find('>td:eq(1)').text();
        let nonce = $(rows[i++]).find('>td:eq(1)').text();
        let transactions = $(rows[i++]).find('>td:eq(1)').text();
        let receivedCoins = $(rows[i++]).find('>td:eq(1)').text();
        let networkFees = $(rows[i++]).find('>td:eq(1)').text();


      


        return {
            hash,
            previous,
            next,
            height: Number(height),
            version,
            merkle,
            time,
            difficulty,
            nonce,
            transactions: Number(transactions),
            receivedCoins,
            networkFees,
        };
    },
};