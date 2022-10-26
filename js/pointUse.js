(function () {
  const $typeSelect = document.getElementById("type-inquiry-select");
  const $typeArray = ["A", "B", "C", "D", "E", "F", "G"];

  $typeArray.forEach((el) => {
    $typeSelect.innerHTML += `<option value="${el}">TYPE ${el}</option>`;
  });
  const $myPoint = document.getElementById("myPoint"),
    $orderAmt = document.getElementById("orderAmt"),
    $inquiryPoint = document.getElementById("inquiryPoint"),
    $pointBtn = document.getElementById("point-input-btn"),
    $useMinPoint = document.getElementById("useMinPoint"),
    $useMaxPoint = document.getElementById("useMaxPoint"),
    $useUnitPoint = document.getElementById("useUnitPoint"),
    $usePoint = document.getElementById("usePoint"),
    $total = document.getElementById("total");

  const url =
    "https://cors-anywhere.herokuapp.com/https://test-menu.payco.kr/test/api";

  // 포인트내역가져오기
  // async function getPoint() {
  //   try {
  //     const res = await axios.post(`${url}/work/point`, { type: "A" });

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  document.querySelector("#type-inquiry-btn").addEventListener("click", () => {
    getPoint2();
  });

  const getPoint2 = () => {
    axios
      .post(`${url}/work/point`, {
        type: "D",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function pointInquiry() {
    const res = user.result;
    $orderAmt.innerHTML = res.orderAmt;
    $myPoint.innerHTML = res.myPoint;
    $inquiryPoint.value = res.useMaxPoint;
    $useMaxPoint.value = res.useMaxPoint;
    $useMinPoint.value = res.useUnitPoint;
    $useUnitPoint.value = res.useUnitPoint;
  }

  const pointSubmit = () => {
    if ($inquiryPoint.value % $useUnitPoint.value !== 0) {
      alert(`적립포인트단위는 ${$useUnitPoint.value}입니다.`);
      $inquiryPoint.focus();
    }

    if (
      $inquiryPoint.value > $useMaxPoint.value ||
      $inquiryPoint.value < $useMinPoint.value
    ) {
      alert("포인트 사용범위를 확인하세요");
      $inquiryPoint.focus();
    }
    $usePoint.innerHTML = $inquiryPoint.value;
    $total.innerHTML = $orderAmt.textContent - $inquiryPoint.value;
  };

  const init = () => {
    window.addEventListener("DOMContentLoaded", () => {
      // pointInquiry();
      // getPoint();
      $pointBtn.addEventListener("click", pointSubmit);
    });
  };

  init();
})();
