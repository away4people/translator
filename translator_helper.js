(function(){

  // Holds the data structure for all the context menus used in the app
  var CONTEXT_MENU_CONTENTS = {
    forSelection: [
      'Translate'
    ]
  }

  function setUpContextMenus() {
    CONTEXT_MENU_CONTENTS.forSelection.forEach(function(commandId) {
      chrome.contextMenus.create( {
        title: commandId + ' "%s"',
        id: commandId,
        contexts: ['selection']
      });
    });
  }

  var translatorWindow;
  var windowOption = localStorage['windowOption'] || 'width=760, height=400, left=0, top=0';
  var translatorURLTemplate = localStorage['templateURL'] || 'https://translate.google.com/#auto/auto/{?}';
  localStorage['templateURL'] = translatorURLTemplate;
  localStorage['windowOption'] = windowOption;

  chrome.contextMenus.onClicked.addListener(function(itemData) {
    var selectionText = itemData.selectionText;
    if (selectionText){
      translatorURLTemplate = localStorage['templateURL'] || 'https://translate.google.com/#auto/auto/{?}';
      var translatorURL = translatorURLTemplate.replace('{?}', selectionText);
      var encodedTranslatorURL = encodeURI(translatorURL);
      if(!translatorWindow || translatorWindow.closed) {
        windowOption = localStorage['windowOption'] || 'width=760, height=400, left=0, top=0';
        translatorWindow = window.open(encodedTranslatorURL, '_blank', windowOption);
      } else {
        translatorWindow.location.href = encodedTranslatorURL;
        translatorWindow.focus();
      }
    }
  });

  setUpContextMenus();
})();