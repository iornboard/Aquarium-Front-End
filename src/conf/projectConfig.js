export const statusInfo = {
    defult    : {idx: 0, color: "#673ab7", barColor:"#4527a0", korean:"기본", text:"defult", description:"아무런 상태도 부여되지 않은 상태입니다."},
    safe      : {idx: 1, color: "#2196f3", barColor:"#1565c0", korean:"안전", text:"safe", description:"작업상태가 여유롭습니다. 다른 작업을 더 살펴보세요"},
    processing: {idx: 2, color: "#4caf50", barColor:"#2e7d32", korean:"진행중", text:"processing", description:"작업이 진행중입니다."},
    deadlock  : {idx: 3, color: "#ffc107", barColor:"#ff8f00", korean:"교착됨", text:"deadlock", description:"작업이 진행하지 못하고 있습니다. 어서 해결하세요"},
    warning   : {idx: 4, color: "#ff5722", barColor:"#d84315", korean:"위험", text:"warning", description:"작업이 위험합니다. 어서 빨리 해결해야 합니다."},
    overterm  : {idx: 5, color: "#f44336", barColor:"#c62828", korean:"만료됨", text:"overterm", description:"마감날자까지 완료하지 못했습니다."},
    end       : {idx: 6, color: "#9e9e9e", barColor:"#424242", korean:"완료", text:"end", description:"작업이 완료된 상태입니다."}
    }