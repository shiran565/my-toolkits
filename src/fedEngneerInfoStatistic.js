//var idNumbers = "11100798,11120711,11091437,11084503,72065573,72088120,72143258,11055103,11103375,72057678,11127388,11111282,11101747,11070547,11072820,11090253,11099163,11091000,72155845,11103298,11136950,11091239,11136504,72144286,72088336,72078201,11135847,11073275,11140690,11072643,10938086,11140347,72134752,11104306,11101837,72066155,11127720,72030164,72144502,72059446,72060798,11101638,11091034,72051498,72065530,11140737,11101807,72088039,72038138,11083068,72157951,11073187,11042274,72090846,11123356,11091628,11103899,72145408,11100776,72088589,11072750,72094509,11127191,72063070,72083036,72024346,72126190,72102808,72089088,72088073,11088482,11099912,11104144,72065574,72071091,11084509,72156245,11103916,11104760,11090574,72120206,72027488,72151777,11135061,11101767,72066373,72139127,11099747,72068242,11108855,10930953,11098731,72088083,72130206,11112334,72134681,11088169,11123626,72024321,11091752,11090745,11136706,10987887,72109910,72083401,11097243,11123358,11084511,72030290,11110407,11141559,72059050,72037719,11104476,72141248,72077768,72088160,72084580,11087256,11067426,10966669,11103094,72065981,11141655,11138572,11101498,72065014,11110624,11137033,11136729,11084752,11089792,72059023,11079602,11127190,72058482,11120098,72059901,72065024,11136791,11138569,72131865,11119667,72158176,11004553,11090604,72079750,11111617,11091977,72084377,72060724,11138744,11090691,11101625,72134287,11091506,11085179,11136840,11100184,11102156,72084719,11070540,72091897,11072886,11091354,11101748,72024332,72047241,11070532,11084478,72126780,11099731,72034305,11086661,72146684,11102804,11118284,72062920,11103143,72132711,11073622,72060762,72059047,11132328,10994375,11101055,11111491,72126773,11087505,11003583,11102438,72147174,72047235,72134673,11055938,11072298,72065012,72153065,11100936,11071693,11119631,72140534,11085181,11053281,11085174,11087562,72141899,72097659,11072316,72073283,11078207,72155369,11087385,72089429,72084677,11076640,72126886,11102512,72158237,72116631,72135858,72088211,11054669,11104595,72069200,11072573,72095407,72139133,11120021,72135533,11139196,11083067,11101033,11090096,11101051,11136640,72138258,72130960,72062756,72128299,11101493,11093917,72089087,11083794,11070269,11104585,11119873,11090094".split(",");
var idNumbers = "11100798,11120711,11091437,11084503".split(",");

document.querySelectorAll(".el-table__body-wrapper_list tr").forEach($tr=>{
    BpmUserGroupDetailNS.runtime.services.userGroupDetail.getStaffCard({
        data: {
            id: $tr.children[1].firstElementChild.textContent
        }
        }).then(e=>{
          $tr.children[4].innerHTML = e.data.positionName
    })
});

