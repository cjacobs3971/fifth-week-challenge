// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // create an array of objects that represent each time block
  const timeBlocks = [
    { id: "09", time: "09:00 AM" },
    { id: "10", time: "10:00 AM" },
    { id: "11", time: "11:00 AM" },
    { id: "12", time: "12:00 PM" },
    { id: "13", time: "01:00 PM" },
    { id: "14", time: "02:00 PM" },
    { id: "15", time: "03:00 PM" },
    { id: "16", time: "04:00 PM" },
    { id: "17", time: "05:00 PM" },
  ];

  // function to generate time block html
  function generateTimeBlockHtml(block) {
    const currentHour = parseInt(dayjs().format("HH"));
    const blockHour = parseInt(block.id);

    // set the class for the time block based on whether it is in the past, present or future
    let blockClass = "";
    if (blockHour < currentHour) {
      blockClass = "past";
    } else if (blockHour === currentHour) {
      blockClass = "present";
    } else {
      blockClass = "future";
    }

    // generate the html for the time block
    return `
      <div class="row time-block ${blockClass}">
        <div class="col-2 hour">
          ${block.time}
        </div>
        <textarea class="col-8 description" id="${block.id}"></textarea>
        <button class="col-2 saveBtn" data-id="${block.id}">
          <i class="fas fa-save"></i>
        </button>
      </div>
    `;
  }

  // generate the html for each time block and add it to the page
  for (const block of timeBlocks) {
    const blockHtml = generateTimeBlockHtml(block);
    $("#time-blocks").append(blockHtml);
  }

  // set the current day at the top of the page
  const currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // save text entered in a time block to local storage when save button is clicked
  $(".saveBtn").on("click", function () {
    const blockId = $(this).data("id");
    const blockText = $("#" + blockId).val();
    localStorage.setItem(blockId, blockText);
  });

  // get saved text from local storage and display it in the corresponding time block
  for (const block of timeBlocks) {
    const savedText = localStorage.getItem(block.id);
    $("#" + block.id).val(savedText);
  }
});

