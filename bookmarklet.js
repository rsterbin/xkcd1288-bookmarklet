/**
 * Bookmarklet for swapping out words in news articles, as per xkcd #1288
 *
 * The code that loads jQuery is from the article linked below.
 *
 * @author Reha Sterbin <rsterbin@gmail.com>
 * @see http://xkcd.com/1288/
 * @see http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
 */
(function(){

    // the minimum version of jQuery we want
    var v = '1.3.2';

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement('script');
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                initXkcd1288Bookmarklet();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        initXkcd1288Bookmarklet();
    }

    function initXkcd1288Bookmarklet() {
        (window.xkcd1288Bookmarklet = function() {

            var allowed_tags = 'body,section,nav,article,aside,h1,h2,h3,h4,' +
                'h5,h6,header,footer,address,main,p,hr,pre,blockquote,ol,ul,' +
                'li,dl,dt,dd,figure,figcaption,div,a,em,strong,small,s,cite,' +
                'q,dfn,abbr,kbd,sub,sup,i,b,u,mark,ruby,rt,rp,bdi,bdo,span,' +
                'ins,del,caption,td,th,form,fieldset,legend,label,button,' +
                'option,textarea,summary,nyt_headline';

            var $nodes = jQuery(allowed_tags)
                .contents()
                .filter(function() {
                    return (this.nodeType == 3 && /\S/.test(this.nodeValue));
                });

            var replacements = {
                'witness' : 'this dude I know',
                'witnesses' : 'these dudes I know',
                'allegedly' : 'kinda probably',
                'new study' : 'Tumblr post',
                'new studies' : 'Tumblr posts',
                'rebuild' : 'avenge',
                'rebuilt' : 'avenged',
                'space' : 'spaaace',
                'google glass' : 'virtual boy',
                'smartphone' : 'pokédex',
                'electric' : 'atomic',
                'senator' : 'elf-lord',
                'senators' : 'elf-lords',
                'car' : 'cat',
                'cars' : 'cats',
                'election' : 'eating contest',
                'elections' : 'eating contests',
                'congressional leaders' : 'river spirits',
                'congressional leader' : 'river spirit',
                'homeland security' : 'homestar runner',
                'could not be reached for comment' : 'is guilty and everyone knows it',
                'force': 'horse',
                'forces': 'horses'
            };

            var toTitleCase = function (str) {
                return str.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };

            $nodes.each(function (i) {
                var keys = new Array;
                for (var k in replacements) {
                    keys.push(k);
                }
                var regex = new RegExp('\\b(' + keys.join('|') + ')\\b', 'i');
                if (regex.test(this.nodeValue)) {
                    var text = this.nodeValue;
                    for (var k in replacements) {
                        var r1 = new RegExp('\\b' + k + '\\b', 'g');
                        var r2 = new RegExp('\\b' + k.toUpperCase + '\\b', 'g');
                        var r3 = new RegExp('\\b' + toTitleCase(k) + '\\b', 'g');
                        var r4 = new RegExp('\\b' + k + '\\b', 'gi');
                        text = text.replace(r1, replacements[k]);
                        text = text.replace(r2, replacements[k].toUpperCase);
                        text = text.replace(r3, toTitleCase(replacements[k]));
                        text = text.replace(r4, replacements[k]);
                    }
                    jQuery(this).replaceWith(document.createTextNode(text));
                }
            });
        })();
    }

})();

