var baslib = {
  getFilteredPort:function() {
    if(window.location.port=='') {
      return '';
    } else {
      return ':' + window.location.port;
    }
  },
  getURL:function() {
    return window.location.protocol + "\/\/" + window.location.hostname + baslib.getFilteredPort() + "\/";
  },
  getByString:function(getString,StringArray) {
    for(var i=0;i<StringArray.length;i++) {
      if(StringArray[i]==getString) {
        return i;
      }
    }
    return -1;
  }
}
