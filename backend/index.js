const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
require('./queries/mysqlqueries')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//sqlconnection

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'f5E7fbJtKugRyMvP',
  database: 'nutrisciencedb',
})

//get infos from Finished Goods Section
app.get(
  '/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
  (req, res) => {
    const sqlquery = 'SELECT * FROM `finished_goods`'
    db.query(sqlquery, (error, result) => {
      res.send(result)
      console.log(result)
    })
  },
)
//Delete FG
app.post(
  '/deletefg',
  (req, res) => {
    const productName = req.body.productName
   
    const sqlquery =
      'DELETE from `finished_goods` where `Product_name` = ?'

    db.query(sqlquery, [productName], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  },
)

//Insert Query from Modal of Adding Raw Mat
app.post(
  '/KZRKZAbShEgdZSfM6JzxW7gylcHzQyvfoJDMkvMEj6oggJJmg7dAzDWFPaXmWC0zcn7YWBpjZbs6vFMWK8R3OpbqKVkuEuSbPkvwJkDk5ASHj7euv8lrgOfcxbUcpI73',
  (req, res) => {
    const rmname = req.body.rmname
    const rmtype = req.body.rmtype
    const rmquantity = req.body.rmquantity
    const sqlquery =
      'INSERT INTO `raw_mats` (`rawmat_name`,`rawmat_type`,`current_stocks`) values (?,"Macro",?)'

    db.query(sqlquery, [rmname, rmquantity], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  },
)

//Insert Query from modal -- Finished Goods Section
app.post(
  '/M2ioH1bN7l5rSvpzesC6a6QeYUEgG0VYYHsaEYplll2kUFRthoFHSEZCDLUMfBHoK5olXyXRmIi64bmWAQcg1LEsU6TnDFEjXRjgKFiiVxMRC8rntOfTABui6Z68AOcU',
  (req, res) => {
    const pname = req.body.pname
    const psize = req.body.psize
    const quantity = req.body.iquantity

    db.query(
      'INSERT INTO `finished_goods` (`Product_name`,`Packaging_in_kls`,`Quantity`) values (?,?,?)',
      [pname, psize, quantity],
      (err, result) => {
        if (err) {
        } else {
          res.send(result)
        }
      },
    )
  },
)
//Update Query for finished goods from sales
app.post('/updatefgsales', (req, res) => {
  const fgname = req.body.fgname
  const difference = req.body.difference

  db.query(
    'UPDATE `finished_goods` SET `Quantity` = ? WHERE `Product_name` = ?',
    [difference, fgname],
    (err, result) => {
      if (err) {
        console.log(err, result)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Update Macro from Pouring
app.post('/updatemacropouring', (req, res) => {
  const macroname = req.body.macroname
  const difference = req.body.difference

  db.query(
    'UPDATE `raw_mats` SET `current_stocks` = ? WHERE `rawmat_name` = ?',
    [difference, macroname],
    (err, result) => {
      if (err) {
        console.log(err, result)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Update Micro from Pouring
app.post('/updatemicropouring', (req, res) => {
  const microname = req.body.microname
  const difference = req.body.difference

  db.query(
    'UPDATE `micros` SET `current_stocks` = ? WHERE `micro_name` = ?',
    [difference, microname],
    (err, result) => {
      if (err) {
        console.log(err, result)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})

//Insert Pouredmats
app.post('/insertpouring', (req, res) => {
  const date = req.body.date
  const matname = req.body.matname
  const quantity = req.body.quantity

  db.query(
    'INSERT INTO `poured_mats` (`date`,`name`,`quantity`) values (?,?,?)',
    [date, matname, quantity],
    (err, result) => {
      if (err) {
      } else {
        res.send(result)
      }
    },
  )
})
//Select Poured Materials
app.get('/pouring', (req, res) => {
  const sqlquery = 'SELECT * FROM `poured_mats`ORDER BY `date` DESC'
  db.query(sqlquery, (error, result) => {
    res.send(result)
  })
})

//Select Query for Macros
app.get(
  '/Ubua80poBcH8AeMxqtUIlBYqE2S7n9CX8Thnbd9R70GmpPVZ69nrjvyDA5gJOvsS3c6KULorOqmA7hRJUa2dKNSa4v0XMiYF887Td8FlkSOHrHRLCAFEMxEJCUhjI8HI',
  (req, res) => {
    const sqlquery =
      'SELECT ID, rawmat_name,  rawmat_type, current_stocks,bin_content, CASE WHEN current_stocks <4000 THEN "--CRITICAL--" ELSE " " END annotation from raw_mats ORDER BY `rawmat_name` ASC'
    db.query(sqlquery, (error, result) => {
      res.send(result)
    })
  },
)
//Select Query Micros
app.get('/searchmicros', (req, res) => {
  const sqlquery =
    'SELECT ID, micro_name, type, current_stocks,pending, CASE WHEN current_stocks <50 THEN "--CRITICAL--" ELSE " " END annotation from micros ORDER BY `micro_name` ASC'
  db.query(sqlquery, (error, result) => {
    res.send(result)
  })
})
//Select Query for Delivery Receptions
app.get(
  '/N0eQ5sDwIIl7DbYRSYBJzOx6E3NcpwmiYRUokQq4hR9xgfqny0MhmxRnydS1jHtkWyEPdr8XABAeYEv5rB1Hq68yEavRPoAXVAE5LXi3Z5UK3nnS5QBxAR8cdjBQiMsU',
  (req, res) => {
    const sqlquery = 'SELECT * FROM `delivery_receptions`'
    db.query(sqlquery, (error, result) => {
      res.send(result)
    })
  },
)
//Update Query From Delivery Reception -- Macro
app.post(
  '/vanmhWQsuTLs7UkHEL9wKJj7UeOORJWB3VJWsrPUtdHUpg9y3NwqgQqu3oKDWtP7HORynoGdK5s1ai1FElKoqzJ9F2VrgrNar3qnpIlebIxjf46hPDe72VdpYIZfWFIT',
  (req, res) => {
    const rmmodal = req.body.rmmodal
    const sum = req.body.sum

    db.query(
      'UPDATE `raw_mats` SET `current_stocks` = ? WHERE `rawmat_name` = ?',
      [sum, rmmodal],
      (err, result) => {
        if (err) {
          console.log(err, result)
        } else {
          console.log(result)
          res.send(result)
        }
      },
    )
  },
)
//Delete Macro
app.post('/deletemacro', (req, res) => {
  const macroname = req.body.macroname

  db.query('Delete from `raw_mats` where `rawmat_name` = ?', [macroname], (err, result) => {
    if (err) {
      console.log(err, result)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})
//Update Query From Delivery Reception -- Micro
app.post(
  '/iUOFilAxLKq2l97lkC0D7vKBrsnjZXsEWAmK6FHVU2KAARsY7LxhPdAMwCikbiklUcJzkEQvSJKmxdnDrlwwquZXxuKmdVglecPx4URaIktwywzGpzkPPactJDERKGjX',
  (req, res) => {
    const rmmodal = req.body.rmmodal
    const summicro = req.body.summicro

    db.query(
      'UPDATE `micros` SET `current_stocks` = ? WHERE `micro_name` = ?',
      [summicro, rmmodal],
      (err, result) => {
        if (err) {
          console.log(err, result)
        } else {
          console.log(result)
          res.send(result)
        }
      },
    )
  },
)
//Delete Micro
app.post('/deletemicro', (req, res) => {
  const microname = req.body.microname

  db.query('Delete from `micros` where `micro_name` = ?', [microname], (err, result) => {
    if (err) {
      console.log(err, result)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})
//Select query suppliers name
app.get(
  '/zj31D2dcD0apzqmc6obb1XtF1pJDD1X2uy4pTpoLYQ9HAHFr0cW6mXbIpOD4PJIk9qcMj50yv65qSr9hga6ZuBoEOkeE6oUvmtGWdNbKqkoNBasnDLu2JuuayLObR4mN',
  (req, res) => {
    const sqlquery = 'SELECT * FROM `suppliers`'
    db.query(sqlquery, (error, result) => {
      res.send(result)
    })
  },
)
//Insert query Supplier Names
app.post('/insertsuppnames', (req, res) => {
  const suppliers = req.body.suppliers
  const sqlquery = 'Insert into `suppliers`(`supplier_name`) values (?)'
  db.query(sqlquery, [suppliers], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

//Insert Query from Delivery Reception
app.post(
  '/zz3wgk4yktUVrDDYyxT31V3ciuCmF77veI3oaBWwTVjpkhjnwXXGrQyVRlNIp8W8oAOk6a5DvPnDUu9AT1fWNOgyO3rm9Ln5jAMICvWTvtg0PPcacME8oGAmYk47QIjm',
  (req, res) => {
    const date = req.body.date
    const supplier = req.body.supplier
    const rmmodal = req.body.rmmodal
    const newquantity = req.body.newquantity
    const dr = req.body.dr
    const remarks = req.body.remarks

    db.query(
      'INSERT INTO `delivery_receptions` (`date`,`supplier`,`rawmat_name`,`quantity`,`dr_no`,`remarks`) values (?,?,?,?,?,?)',
      [date, supplier, rmmodal, newquantity, dr, remarks],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  },
)
//Select Query Customer Name
app.get('/custnames', (req, res) => {
  const sqlquery = 'SELECT * FROM `customers` ORDER BY `ID` DESC'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
//Insert query Customer names
app.post('/insertcustname', (req, res) => {
  const names = req.body.names
  const sqlquery = 'Insert into `customers`(`cust_name`) values (?)'
  db.query(sqlquery, [names], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
      console.log(result)
    }
  })
})
//Insert query --Micro
app.post('/insertmicro', (req, res) => {
  const microname = req.body.microname
  const quantity = req.body.quantity
  const sqlquery = 'Insert into `micros`(`micro_name`,`type`,`current_stocks`) values (?,"Micro",?)'
  db.query(sqlquery, [microname, quantity], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})
//Select query for production records
app.get('/prodrecords', (req, res) => {
  const sqlquery = 'SELECT * FROM `production_records`'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
app.get('/proddailyrecords', (req, res) => {
  const sqlquery = 'SELECT * FROM `daily_production`'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
//Insert query Daily Production
app.post('/insertdailyproduction', (req, res) => {
  const proddate = req.body.proddate
  const prodname = req.body.prodname
  const packsize = req.body.packsize
  const bagsmade = req.body.bagsmade
  const inkls = req.body.inkls
  const remarks = req.body.remarks
  const sqlquery =
    'Insert into `daily_production`(`production_date`,`product_name`,`packaging_size`,`bags_made`,`in_kls`,`remarks`,`prev_fg_quantity`) values (?,?,?,?,?,?,0)'
  db.query(sqlquery, [proddate, prodname, packsize, bagsmade, inkls, remarks], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})
//Update Query Daily Production to Finished Goods
app.post('/updatefg', (req, res) => {
  const rmmodal = req.body.rmmodal
  const sum = req.body.sum

  db.query(
    'UPDATE `finished_goods` SET `Quantity` = ? WHERE `Product_name` = ?',
    [sum, rmmodal],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Authenticate Users
app.post('/selectusers', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    'SELECT * FROM `users` where `username`= ? and `password` = ?',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.length > 0) {
          res.send(result)
        } else {
          res.send('Login Failed')
        }
      }
    },
  )
})
//Post Sales
app.post('/postsales', (req, res) => {
  
  const date = req.body.date
  const custName = req.body.custName
  const si_no = req.body.si_no
  const data = req.body.data

  db.query(
    'Insert into `sales_stats` (`date`,`cust_name`,`inv_no`,`product_and_quantity`) values (?,?,?,"{?}")',
    [date,custName,si_no,data],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Get sales stats
app.get('/salestats', (req, res) => {
  const sqlquery = 'SELECT * FROM `sales_stats` ORDER BY `date` DESC'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
//Insert Inbounding Materials
app.post('/postinbounding', (req, res) => {
  
  const supplier = req.body.supplier
  const pname = req.body.pname
  const quantity = req.body.quantity
  const number = req.body.number

  db.query(
    'Insert into `inbounding` (`supplier`,`product_name`,`po_quantity`,`po_number`) values (?,?,?,?) ',
    [supplier,pname,quantity,number],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Get infos inbounding
app.get('/getinbounding', (req, res) => {
  const sqlquery = 'SELECT * FROM `inbounding`'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})
//Delete inbounding
app.post('/deleteinbounding', (req, res) => {
  const pname = req.body.pname
  const pnumber = req.body.pnumber

  db.query(
    'Delete from `inbounding` where `product_name` = ? and `po_number` = ?',
    [pname, pnumber],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    },
  )
})
//Select packagings
app.get('/getpackagings', (req, res) => {
  const sqlquery =
    'SELECT `ID`,`packaging_name`,`type`,`current_stocks`, CASE WHEN current_stocks <500 THEN "--CRITICAL--" ELSE " " END annotation FROM `packagings`'
  db.query(sqlquery, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})

//Insert packaging
app.post('/insertpackagings', (req, res) => {
  const packagingName = req.body.packagingName
  const currentStocks = req.body.currentStocks

  const sqlquery =
    'Insert into `packagings`(`packaging_name`,`type`,`current_stocks`) values (?,"Packaging",?)'
  db.query(sqlquery, [packagingName, currentStocks], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})

//Update packaging from Delivery
app.post('/updatepackagings', (req, res) => {
  const packagingName = req.body.packagingName
  const newval = req.body.newval

  const sqlquery = 'Update `packagings` SET `current_stocks` = ? where `packaging_name` = ? '
  db.query(sqlquery, [newval, packagingName], (error, result) => {
    if (error) {
      console.log(error)
    } else {
      res.send(result)
    }
  })
})




app.listen(5006, () => {
  console.log('Running on port 5001')
})
