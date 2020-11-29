{
// Get html elements for tip and text container
  const tipElement = document.getElementById('tip')
  const widgetTextElement = document.getElementById('widget-text')


  function onSelectionChanged(widgets) {
    // Get selected widgets
    // console.log("onsel widgets", widgets);
    // Get first widget from selected widgets
    let text = widgets.length > 0 ? widgets[0].text : null;

    // Check that widget has text field
    if (typeof text === 'string') {
      // hide tip and show text in sidebar
      tipElement.style.opacity = '0'
      widgetTextElement.value = text
    } else {
      // show tip and clear text in sidebar
      tipElement.style.opacity = '1'
      widgetTextElement.value = ''
    }
  }

  BoardSelection.addSelectionListener(onSelectionChanged)

}