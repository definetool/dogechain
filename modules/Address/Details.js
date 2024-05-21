

module.exports = {
    parse($) { 
        
        let rows = $('#wrapper table.table:eq(0)>tbody>tr').toArray();

        let i = 0;

        let hash = $(rows[i++]).find('>td:eq(1)').text();
   

      

        let balance = $(rows[i++]).find('>td:eq(1)>span').text().split(',').join('');
        let balance$ = $(rows[i++]).find('>td:eq(1)>span').text();
        let transactions = $(rows[i++]).find('>td:eq(1)>span').text().split(',').join('');
        let received = $(rows[i++]).find('>td:eq(1)>span').text().split(',').join('');
        let sent = $(rows[i++]).find('>td:eq(1)>span').text().split(',').join('');


      


        return {
            hash,
            balance: Number(balance),
            balance$,
            transactions: Number(transactions),
            received: Number(received),
            sent: Number(sent),
        };
    },
};