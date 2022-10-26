
const url = "https://test-menu.payco.kr/test/api";


const scope = {

  object : {
    $selectDay : document.getElementById("select-day"),
    $selectTime : document.getElementById("select-time")
  },

  functions : {
    getWorkTime : async () => {
      try {
        const res = await axios.get(`${url}/work/time`);

        if (res.data.status !== 0) {
          throw new Error(res.data.message);
        }
        
        mobileSelect.updateWheel(0, res.data.result);

      } catch (error) {    
        alert(error);
      }
    },
    getWorkPoint : async () => {
      try {

        let $select_point_type = document.getElementById("select_point_type");


        if($select_point_type.value === "") {
          $select_point_type.focus();
          throw new Error("조회 type을 선택해주세요");          
        }

        const res = await axios.post(`${url}/work/point`, { type : $select_point_type.value});
    
        if (res.data.status !== 0) {
          throw new Error(res.data.message);
        } 
    
        console.log(res.data);
    
      } catch (error) {    
        alert(error);
      }
    },
    getWorkPointUseHistory : () => {
      try {    

        if(scope.object.$selectDay.value === "") {
          throw new Error("조회 날짜를 선택해주세요.");          
        }

        if(scope.object.$selectTime.value === "") {
          throw new Error("조회 시간을 선택해주세요.");          
        }

        alert("조회성공");

      } catch (error) {    
        alert(error);
      }
    },
    init : () => {            
      scope.functions.getWorkTime();
    }
  }
};


let mobileSelect2 = new MobileSelect({
  trigger: "#select-time-wrap",
  ensureBtnText: "확인",
  cancelBtnText: "취소",
  triggerDisplayValue: false,
  wheels: [
    {
      data: [
        {
          id: "am",
          value: "am",
          childs: [
            {
              id: "08",
              value: "8시",
              date: "2022102408",
              childs: [
                {
                  id: "00",
                  value: "00분",
                  date: "202210240800",
                },
                {
                  id: "10",
                  value: "10분",
                  date: "202210240810",
                },
                {
                  id: "20",
                  value: "20분",
                  date: "202210240820",
                },
                {
                  id: "30",
                  value: "30분",
                  date: "202210240830",
                },
                {
                  id: "40",
                  value: "40분",
                  date: "202210240840",
                },
                {
                  id: "50",
                  value: "50분",
                  date: "202210240850",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // initValue: "날짜선택", // Initialize value
  onChange: function (data, indexArr, msInstance) {
    console.log(data);
    const time = data[1].value + data[2].value;
    scope.object.$selectTime.innerHTML = time;
    //$timeText.innerHTML = time;
  },
});

let mobileSelect = new MobileSelect({
  trigger: "#select-day-wrap",
  ensureBtnText: "확인",
  cancelBtnText: "취소",
  triggerDisplayValue: false,
  wheels: [{ data: [{ id: "1", value: "choose day" }] }],
  // initValue: "날짜선택", // Initialize value
  onChange: function (data, indexArr, msInstance) {
    scope.object.$selectDay.innerHTML = data[0].date;
    //$dayText.innerHTML = data[0].date;
    
    const arr = [];
    for (let i = 0; i < 2; i++) {
      const dic = {};
      if (i == 0) {
        dic["id"] = "am";
        dic["value"] = "am";
        dic["childs"] = null;
        arr.push(dic);
      } else {
        dic["id"] = "pm";
        dic["value"] = "pm";
        dic["childs"] = null;
        arr.push(dic);
      }
    }

    arr[0].childs = data[0].childsAm;
    arr[1].childs = data[0].childsPm;

    mobileSelect2.updateWheels(arr);
    value = true;
  },
});



window.addEventListener("DOMContentLoaded", () => {   
  scope.functions.init();
  document.getElementById("btn_init").addEventListener("click", scope.functions.init);
  document.getElementById("btn_getWorkPoint").addEventListener("click", scope.functions.getWorkPoint);
  document.getElementById("btn_getWorkPointUseHistory").addEventListener("click", scope.functions.getWorkPointUseHistory);
});