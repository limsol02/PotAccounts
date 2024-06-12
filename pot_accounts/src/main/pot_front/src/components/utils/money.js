// 금액에 쉼표 추가하여 반환하는 함수
const getMoneyUnit = (money) => {
    const REGEX = {
        MONEY: /\B(?=(\d{3})+(?!\d))/g, // 천 단위로 쉼표를 추가하기 위한 정규식
    };

    const newMoney = money.toString().replace(REGEX.MONEY, ",");
    return newMoney;
};

export default getMoneyUnit;