const http = require("http");
const fs = require("fs");

module.exports = exports = function (pageNum) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.medalerts.org",
      port: 80,
      path: `/vaersdb/findfield.php?EVENTS=on&PAGENO=${pageNum}&PERPAGE=100&ESORT=&REVERSESORT=&VAX=(COVID19)&SYMPTOMS=(Aborted_pregnancy_%2810000209%29+Abortion_%2810000210%29+Abortion_spontaneous_%2810000234%29+Abortion_spontaneous_complete_%2810061616%29+Abortion_spontaneous_incomplete_%2810061617%29+Abortion_threatened_%2810000242%29+Foetal-maternal_haemorrhage_%2810016871%29+Foetal_cardiac_disorder_%2810052088%29+Foetal_damage_%2810016852%29+Foetal_death_%2810055690%29+Foetal_disorder_%2810061157%29+Foetal_distress_syndrome_%2810016855%29+Foetal_heart_rate_abnormal_%2810051139%29+Foetal_heart_rate_deceleration_%2810058322%29+Foetal_heart_rate_deceleration_abnormality_%2810074636%29+Foetal_heart_rate_decreased_%2810051136%29+Foetal_heart_rate_disorder_%2810061158%29+Foetal_heart_rate_increased_%2810051138%29+Foetal_hypokinesia_%2810068461%29+Foetal_malformation_%2810060919%29+Foetal_malpresentation_%2810058013%29+Foetal_monitoring_abnormal_%2810071507%29+Foetal_movement_disorder_%2810077576%29+Foetal_movements_decreased_%2810016866%29+Foetal_non-stress_test_abnormal_%2810071516%29+Placental_disorder_%2810035132%29+Pregnancy_induced_hypertension_%2810036563%29+Premature_baby_%2810036590%29+Premature_baby_death_%2810076700%29+Premature_delivery_%2810036595%29+Premature_labour_%2810036600%29+Premature_rupture_of_membranes_%2810036603%29+Premature_separation_of_placenta_%2810036608%29+Stillbirth_%2810042062%29+Ultrasound_foetal_abnormal_%2810077578%29)`,
      method: "GET",
      headers: {},
    };
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      let result = "";
      res.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
        result = result.concat(chunk.toString());
      });
      res.on("end", () => {
        console.log("No more data in response.");
        fs.writeFileSync(`page_${pageNum}.html`, result);
        resolve();
      });
    });

    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.end();

    //https://www.medalerts.org/vaersdb/findfield.php?EVENTS=on&PAGENO=1&PERPAGE=100&ESORT=&REVERSESORT=&VAX=(COVID19)&SYMPTOMS=(Aborted_pregnancy_%2810000209%29+Abortion_%2810000210%29+Abortion_spontaneous_%2810000234%29+Abortion_spontaneous_complete_%2810061616%29+Abortion_spontaneous_incomplete_%2810061617%29+Abortion_threatened_%2810000242%29+Foetal-maternal_haemorrhage_%2810016871%29+Foetal_cardiac_disorder_%2810052088%29+Foetal_damage_%2810016852%29+Foetal_death_%2810055690%29+Foetal_disorder_%2810061157%29+Foetal_distress_syndrome_%2810016855%29+Foetal_heart_rate_abnormal_%2810051139%29+Foetal_heart_rate_deceleration_%2810058322%29+Foetal_heart_rate_deceleration_abnormality_%2810074636%29+Foetal_heart_rate_decreased_%2810051136%29+Foetal_heart_rate_disorder_%2810061158%29+Foetal_heart_rate_increased_%2810051138%29+Foetal_hypokinesia_%2810068461%29+Foetal_malformation_%2810060919%29+Foetal_malpresentation_%2810058013%29+Foetal_monitoring_abnormal_%2810071507%29+Foetal_movement_disorder_%2810077576%29+Foetal_movements_decreased_%2810016866%29+Foetal_non-stress_test_abnormal_%2810071516%29+Placental_disorder_%2810035132%29+Pregnancy_induced_hypertension_%2810036563%29+Premature_baby_%2810036590%29+Premature_baby_death_%2810076700%29+Premature_delivery_%2810036595%29+Premature_labour_%2810036600%29+Premature_rupture_of_membranes_%2810036603%29+Premature_separation_of_placenta_%2810036608%29+Stillbirth_%2810042062%29+Ultrasound_foetal_abnormal_%2810077578%29)
  });
};
