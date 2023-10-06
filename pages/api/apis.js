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
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const Userid = req.body.Userid;
    const Password = req.body.Password;
    var dbConn = await sql.connect(dbConfig);
    if (dbConn) {
        sql.query("select count(*) as Count,max(Password) as Password  from ctcl_zerodha.dbo.UserInfo where Userid='" + Userid + "' ").then(function (resp) {
            if (resp.recordset) {
                console.log(resp.recordset)
                if (parseInt(resp.recordset[0]["Count"]) > 0) {
                    console.log(resp.recordset)
                    if ((resp.recordset[0]["Password"] === Password)) {
                        return res.status(200).json({ data: "Login Successfully...",Remark:1})
                    }
                    else {
                        return res.status(200).json({ data: "Wrong Password.",Remark:2})
                    }
                }
                else {
                    return res.status(200).json({ data: "User not found...",Remark:3})
                }

            }
        })
    }
}