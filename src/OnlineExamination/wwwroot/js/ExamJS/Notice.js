


(function ($) {
    $.feedbackTab = function (p) {
        p = $.extend
        ({
            ServiceRootPath: '',
            SucessMsg: '',

        }, p);
        var feedbackTab = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: p.ServiceRootPath + 'Exam/',
                method: "",

                SucessMsg: p.SucessMsg
            },
            ShowNotice: function () {
                var webMethod = "http://localhost:49613/Exam/GetAllNotice";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    var options = '';
                    options+='<div>';
                    $.each(data, function (i, item) {
                        debugger;
                        options += '<div><label>'+(i+1)+'. ' + item.noticePublishDate.substr(0, 10) + '</label></div>';
                        options += '<div><label>' + item.noticeMessege+ '</label>';

                    });

                    options += '</div>';
                    document.getElementById("NoticeBoard").innerHTML = options;
                });
                
            },
            
            init: function () {
                feedbackTab.ShowNotice();


            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





