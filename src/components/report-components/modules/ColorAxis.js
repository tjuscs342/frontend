/**
  usage:
    const colorAxis = new ColorAxis({
      min: 0,
      max: 0.05,
      // type: 'logarithmic',
      stops: [
        [0, 'rgba(6, 41, 232, 0.1)'],
        [1, 'rgba(6, 41, 232, 1)']
      ]
    })
*/
function Color(input) {
    // Backwards compatibility, allow instanciation without new
    if (!(this instanceof Color)) {
        return new Color(input);
    }
    // Initialize
    this.init(input);
}
Color.prototype = {

    // Collection of parsers. This can be extended from the outside by pushing parsers
    // to Highcharts.Colors.prototype.parsers.
    parsers: [{
        // RGBA color
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        parse: function (result) {
            return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseFloat(result[4], 10)];
        }
    }, {
        // HEX color
        regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        parse: function (result) {
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1];
        }
    }, {
        // RGB color
        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        parse: function (result) {
            return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), 1];
        }
    }],

    /**
     * Parse the input color to rgba array
     * @param {String} input
     */
    init: function (input) {
        var result,
            rgba,
            i,
            parser;

        this.input = input;

        // Gradients
        if (input && input.stops) {
            this.stops = map(input.stops, function (stop) {
                return new Color(stop[1]);
            });

        // Solid colors
        } else {
            i = this.parsers.length;
            while (i-- && !rgba) {
                parser = this.parsers[i];
                result = parser.regex.exec(input);
                if (result) {
                    rgba = parser.parse(result);
                }
            }
        }
        this.rgba = rgba || [];
    },

    /**
     * Return the color a specified format
     * @param {String} format
     */
    get: function (format) {
        var input = this.input,
            rgba = this.rgba,
            ret;

        if (this.stops) {
            ret = merge(input);
            ret.stops = [].concat(ret.stops);
            each(this.stops, function (stop, i) {
                ret.stops[i] = [ret.stops[i][0], stop.get(format)];
            });

        // it's NaN if gradient colors on a column chart
        } else if (rgba && isNumber(rgba[0])) {
            if (format === 'rgb' || (!format && rgba[3] === 1)) {
                ret = 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
            } else if (format === 'a') {
                ret = rgba[3];
            } else {
                ret = 'rgba(' + rgba.join(',') + ')';
            }
        } else {
            ret = input;
        }
        return ret;
    },

    /**
     * Brighten the color
     * @param {Number} alpha
     */
    brighten: function (alpha) {
        var i,
            rgba = this.rgba;

        if (this.stops) {
            each(this.stops, function (stop) {
                stop.brighten(alpha);
            });

        } else if (isNumber(alpha) && alpha !== 0) {
            for (i = 0; i < 3; i++) {
                rgba[i] += parseInt(alpha * 255);

                if (rgba[i] < 0) {
                    rgba[i] = 0;
                }
                if (rgba[i] > 255) {
                    rgba[i] = 255;
                }
            }
        }
        return this;
    },

    /**
     * Set the color's opacity to a given alpha value
     * @param {Number} alpha
     */
    setOpacity: function (alpha) {
        this.rgba[3] = alpha;
        return this;
    },
    isNumber: function ( n ) {
      return typeof n === 'number' && !isNaN(n);
    }
};

class ColorAxis {
  constructor( config ){
    Object.assign(this, {
      min: 1,
      max: 100,
      type: 'linear',
      stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
      ]
    }, config)
    this.stops = this.stops.map( (ele)=>(new Color(ele)) )
    if ( this.type==='logarithmic' ) {
      this.isLog = this.type==='logarithmic'
      this.min = 0
      this.max = 2
    }
  }
  val2lin(value) {
    return Math.log10(value)
  }
  /*
   * Return an intermediate color between two colors, according to pos where 0
   * is the from color and 1 is the to color.
   * NOTE: Changes here should be copied
   * to the same function in drilldown.src.js and solid-gauge-src.js.
   */
  tweenColors (from, to, pos) {
      // Check for has alpha, because rgba colors perform worse due to lack of
      // support in WebKit.
      var hasAlpha,
          ret;

      // Unsupported color, return to-color (#3920)
      if (!to.rgba.length || !from.rgba.length) {
          ret = to.input || 'none';

      // Interpolate
      } else {
          from = from.rgba;
          to = to.rgba;
          hasAlpha = (to[3] !== 1 || from[3] !== 1);
          ret = (hasAlpha ? 'rgba(' : 'rgb(') +
              Math.round(to[0] + (from[0] - to[0]) * (1 - pos)) + ',' +
              Math.round(to[1] + (from[1] - to[1]) * (1 - pos)) + ',' +
              Math.round(to[2] + (from[2] - to[2]) * (1 - pos)) +
              (hasAlpha ? (',' + (to[3] + (from[3] - to[3]) * (1 - pos))) : '') + ')';
      }
      return ret;
  }
  /**
   * Translate from a value to a color
   */
  toColor(value, point) {
    var pos,
        stops = this.stops,
        from,
        to,
        color,
        dataClass,
        i;
    if (this.isLog) {
        value = this.val2lin(value);
    }
    pos = 1 - ((this.max - value) / ((this.max - this.min) || 1));
    i = stops.length;
    while (i--) {
        if (pos > stops[i].input[0]) {
            break;
        }
    }
    from = stops[i] || stops[i + 1];
    to = stops[i + 1] || from;

    // The position within the gradient
    pos = 1 - (to.input[0] - pos) / ((to.input[0] - from.input[0]) || 1)

    color = this.tweenColors(from, to, pos)
    return color
  }
}
export default ColorAxis
