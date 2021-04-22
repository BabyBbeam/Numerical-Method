const config = {
    "swagger": "2.0",
    "info": {
        "description" : "API Document By Swagger. จัดทำหน้านี้ขึ้นเพื่อรวบรวม API ที่ใช้บนเว็บไซต์นี้",
        "title": "Swagger Numerical Method"
    },
    "host": "my-json-server.typicode.com/BabyBbeam/Numerical-Method",
    "tags": [
        {
            "name": "Root of Equation",
            "description": "โจทย์ทั้งหมดของเนื้อหา Root of Equation",
        }
    ],
    "schemes":[
        "https"
    ],
    "paths":{
        "/root-of-equation":{
            "get":{
                "tags":[
                    "Root of Equation"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Root of Equation",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่าง",
                        "required": false,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    }
                }
            }
        }
    }
}

export { config }