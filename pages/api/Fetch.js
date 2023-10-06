var sql = require("mssql");
var dbConfig = {
    user: "sa",
    password: "",
    server: "192.168.1.164",
    port: 1433,
    databaes: "ctcl_zerodha",
    options: {
        "encrypt": false
    }
};

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function handler (req, res) {
    // if (req.method !== 'GET') {
    //     res.status(405).send({ message: 'Only GET requests allowed' })
    //     return
    // }

    const Userid = req.query.Userid;
    const Password = req.query.Password;
    var dbConn = await sql.connect(dbConfig);
    if (dbConn) {
        sql.query("select * from ctcl_zerodha.dbo.UserInfo where Userid='" + Userid + "' ").then(function (resp) {
          res.status(200).json({data:resp.recordset, })  
        })
    }
}