 const addBtn = document.getElementById('addBtn');
 const saveBtn = document.getElementById('saveBtn');
 const $form = $('form');
 const $btnContainer = $('#addBtn').parent();
 const imgList = [];

 let imgCount = 1;


addBtn.addEventListener('click', (ev) => {
  imgCount++;
  $('<div class="form-group"><label for="image' + imgCount + '">Image ' + imgCount + '</label><input type="url" name="image' + imgCount + '" class="form-control" placeholder="Image ' + imgCount + '"></div>').insertBefore($btnContainer);
});


saveBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  for (let i = 1; i < imgCount; i++) {
    imgList.push($('input[name="image' + i + '"]').val());
  }
  $('input[name="images"]').val(imgList.join(','));
  $form.submit();
});
