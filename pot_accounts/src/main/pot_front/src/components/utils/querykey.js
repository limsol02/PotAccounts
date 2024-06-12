// 유틸성을 위해 상태 관리 쿼리키형태로 따로 작성

const QUERYKEYS = {
    LOAD_ME: "loadMe", // 사용자 정보 로드 쿼리
    LOAD_BOOK_INFO: "loadBookInfo", // 가계부 정보 로드 쿼리
    LOAD_BOOK_LIST: "loadBookList", // 가계부 리스트(개인,공유) 로드 쿼리
    LOAD_MONTH_ASSET: "loadMonthAsset", // 월 자산 로드 쿼리
    LOAD_MONTH_ITEM: "loadMonthItem", // 월 항목 로드 쿼리
    LOAD_SCHEDULE: "loadSchedule", // 스케쥴 로드 쿼리
    LOAD_CATEGORY: "loadCategory", // 카테고리 로드 쿼리
    LOAD_SCHEDULE_DETAIL: "loadScheduleDetail", // 세부 스케쥴 로드 쿼리
    LOAD_HISTORY: "loadHistory", // 히스토리 로드 쿼리
    LOAD_HISTORY_CATEGORY: "loadHistoryCategory", // 히스토리 항목 로드 쿼리
    LOAD_DAY_HISTORY: "loadDayHistory", // 일간 히스토리 로드 쿼리
    LOAD_INCOME: "loadIncome", // 수입 내역 로드 쿼리
    LOAD_INCOME_CATEGORY: "loadIncomeCategory", // 수입 카테고리 로드 쿼리
    LOAD_RECORD: "loadRecord", // 기록 로드 쿼리
    LOAD_MONTH_RECORD: "loadMonthRecord", // 월간 기록 로드 쿼리
    LOAD_MONTH_COMPARE_ANALYZE: "loadMonthCompareAnalyze", // 월별 비교 분석 로드 쿼리
    LOAD_BUDGET_COMPARE_ANALYZE: "loadBudgetCompareAnalyze", // 예산 비교 분석 쿼리
    LOAD_WEEKLY_COMPARE_ANALYZE: "loadWeeklyCompareAnalyze", // 주간 비교 분석 쿼리
    LOAD_FIXED_EXPENSES: "loadFixedExpenses", // 고정 비용 로드 쿼리
};

export default QUERYKEYS;