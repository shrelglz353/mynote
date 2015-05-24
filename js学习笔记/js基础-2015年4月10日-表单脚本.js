(function () {
    //《javascript 高级程序设计》第三版 p431

    /*
        HTML5表单特性：
            autofocus:<input type='text' name='name' autofocus />       自动获得焦点
            required: <input type='text' name='name' required />        不能为空

            type='email': <input type='email' name='name' />            输入类型为email
            type='url': <input type='url' name='url' />                 输入类型为url
            type='tel':<input type='tel' name='tel' />                  输入类型为tel
            等 详见 p448

            HTML5为文本字段新增了pattern属性，用来验证输入的字符是否符合指定的规则，pattern为一个正则表达式字符串

            使用checkValidity()方法可以检测表单元素中的值是否有效，所有表单字段都有这个方法。也可以在表单上面调用该方法
            validity属性表示为什么会无效，该属性对象中包含的属性见 p449

            在表单中设置 novalidate 可以禁用验证
            <form method='post' action='a.html' novalidate></form>
            如果一个表单中有多个提交按钮，想点击其中一个按钮的时候禁用验证可以给该按钮添加 formnovalidate
            <input type='submit' formnvalidate name='name' />

        HTML5 剪贴板事件
            beforecopy:在发生复制操作前触发
            copy:在发生复制操作时触发
            beforecut:在发生剪切操作前触发
            cut:在发生剪切操作时触发
            beforepaste:在发生粘贴操作前触发
            paste:在发生粘贴操作时触发


        富文本辩解 p457
    */
})();