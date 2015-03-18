var $addBtn = $('#addBtn'),
  $saveBtn = $('#saveBtn'),
  $form = $('form'),
  $btnContainer = $addBtn.parent(),
  imgCount = 1,
  imgList = [];

$addBtn.click(function () {
  'use strict';
  imgCount++;
  $('<div class="form-group"><label for="image' + imgCount + '">Image ' + imgCount + '</label><input type="url" name="image' + imgCount + '" class="form-control" placeholder="Image ' + imgCount + '"></div>').insertBefore($btnContainer);
});

$saveBtn.click(function () {
  'use strict';
  for (var i = 1; i <= imgCount; i++) {
    imgList.push($('input[name="image' + i + '"]').val());
  }
  $('input[name="images"]').val(imgList.join(','));
  $form.submit();
});
