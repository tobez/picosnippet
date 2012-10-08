function do_tests()
{
	test("simple", function() {
		expect(1);
		var $r = $(picosnippet(document.getElementById("myid"), {mykey:"hello"}));
		equals($r.text(), "hello", "simple ok");
	});
	test("example 2", function() {
		expect(3);
		var $r = $(picosnippet(document.getElementById("ex2"),
			{t1: "First paragraph", t3: "Last paragraph"}
		));
		equals($r.find(".t1").text(), "First paragraph", "first ok");
		equals($r.find(".t2").text(), "Second paragraph", "second ok");
		equals($r.find(".t3").text(), "Last paragraph", "second ok");
	});
	test("example 3", function() {
		expect(1);
		var $r = $(picosnippet(document.getElementById("ex3"),
			{name: "The Flying Dutchman"}
		));
		equals($r.find(".name").val(), "The Flying Dutchman", "input ok");
	});
	test("example 4", function() {
		expect(2);
		var $r = $(picosnippet(document.getElementById("ex4"),
			{mylist: [{content: "first"}, {content: "second"}]}
		));
		equals($r.find(".mylist").slice(0,1).text(), "first", "first");
		equals($r.find(".mylist").slice(1,2).text(), "second", "second");
	});
	test("example 5", function() {
		expect(2);
		var $r = $(picosnippet(document.getElementById("ex5"),
			{mylist: [{mylist: "first"}, {mylist: "second"}]}
		));
		equals($r.find(".mylist").slice(0,1).text(), "first", "first");
		equals($r.find(".mylist").slice(1,2).text(), "second", "second");
	});
	test("example 6", function() {
		expect(2);
		var $r = $(picosnippet(document.getElementById("ex6"),
			{mylist: ["first", "second"]}
		));
		equals($r.find(".mylist").slice(0,1).text(), "first", "first");
		equals($r.find(".mylist").slice(1,2).text(), "second", "second");
	});
	test("example 7", function() {
		expect(4);
		var $r = $(picosnippet(document.getElementById("ex7"),
			{row: [{name: "Jenny", age: 24}, {name: "John", age: 29}]}
		));
		equals($r.find(".row").slice(0,1).find(".name").text(), "Jenny", "first name");
		equals($r.find(".row").slice(1,2).find(".name").text(), "John", "second name");
		equals($r.find(".row").slice(0,1).find(".age").text(), 24, "first age");
		equals($r.find(".row").slice(1,2).find(".age").text(), 29, "second age");
	});
	test("example 7 repeat", function() {
		expect(4);
		var $r = $(picosnippet(document.getElementById("ex7"),
			{row: [{name: "Frederik", age: 90}, {name: "Larry", age: 72}]}
		));
		equals($r.find(".row").slice(0,1).find(".name").text(), "Frederik", "first name");
		equals($r.find(".row").slice(1,2).find(".name").text(), "Larry", "second name");
		equals($r.find(".row").slice(0,1).find(".age").text(), 90, "first age");
		equals($r.find(".row").slice(1,2).find(".age").text(), 72, "second age");
	});
	test("example 7, no tables", function() {
		expect(4);
		var $r = $(picosnippet(document.getElementById("ex7bis"),
			{row: [{name: "Jenny", age: 24}, {name: "John", age: 29}]}
		));
		equals($r.find(".row").slice(0,1).find(".name").text(), "Jenny", "first name");
		equals($r.find(".row").slice(1,2).find(".name").text(), "John", "second name");
		equals($r.find(".row").slice(0,1).find(".age").text(), 24, "first age");
		equals($r.find(".row").slice(1,2).find(".age").text(), 29, "second age");
	});
	test("example 7, no tables, repeat", function() {
		expect(4);
		var $r = $(picosnippet(document.getElementById("ex7bis"),
			{row: [{name: "Frederik", age: 90}, {name: "Larry", age: 72}]}
		));
		equals($r.find(".row").slice(0,1).find(".name").text(), "Frederik", "first name");
		equals($r.find(".row").slice(1,2).find(".name").text(), "Larry", "second name");
		equals($r.find(".row").slice(0,1).find(".age").text(), 90, "first age");
		equals($r.find(".row").slice(1,2).find(".age").text(), 72, "second age");
	});
	test("example 8", function() {
		expect(1);
		var $r = $(picosnippet(document.getElementById("ex8"),
			{"to-delete": []}
		));
		equals($r.find(".to-delete").length, 0, "deleted");
	});
	test("example 9", function() {
		expect(2);
		var $r = $(picosnippet(document.getElementById("ex9"),
			{"myref": {text: "Mac OS X", href: "http://www.apple.com/"}}
		));
		equals($r.text(), "Mac OS X", "anchor text substituted");
		equals($r.attr("href"), "http://www.apple.com/", "anchor href substituted");
	});

	test("multiple", function() {
		expect(4);
		var $r = $(picosnippet(document.getElementById("export-csv-dialog"),
			{active_columns: [{name: 'aa'}, {name: 'bb'}],
			inactive_columns: [{name: 'dd'}, {name: 'xx'}]}
		));
		equals($r.find(".active_columns").slice(0,1).text(), "aa", "active first");
		equals($r.find(".active_columns").slice(1,2).text(), "bb", "active second");
		equals($r.find(".inactive_columns").slice(0,1).text(), "dd", "inactive first");
		equals($r.find(".inactive_columns").slice(1,2).text(), "xx", "inactive second");
	});

	test("all features", function() {
		expect(19);
		var r = picosnippet(document.getElementById("sn1"),
			{xyz:"hest", c2: "class 2",
			inp:"kukareku",
			todel:[],
			mult:["first","second","third"],
			ref:{ text: "FreeBSD", href: "http://www.freebsd.org/" },
			inp2:{ value: "newval", size: 42 },
			mult2:[{num: 1, reff: { href:"http://one/", text:"one"}},
				{num:2, reff: { href:"http://two/", text:"two"}}]
			});
		var $r = $(r);

		equals($r.find(".xyz").text(), "hest", "xyz paragraph substituted");
		equals($r.find(".c2").text(), "class 2", "c2 paragraph substituted");
		equals($r.find(".inp").val(), "kukareku", "input value substituted");
		equals($r.find(".todel").length, 0, "todel paragraph deleted");
		equals($r.find(".mult").length, 3, "mult list has the right count");
		equals($r.find(".mult").slice(0,1).text(), "first", "mult list first element");
		equals($r.find(".mult").slice(1,2).text(), "second", "mult list second element");
		equals($r.find(".mult").slice(2,3).text(), "third", "mult list third element");
		equals($r.find(".ref").text(), "FreeBSD", "anchor text substituted");
		equals($r.find(".ref").attr("href"), "http://www.freebsd.org/", "anchor href substituted");
		equals($r.find(".inp2").val(), "newval", "input value substituted, compound substitution");
		equals($r.find(".inp2").attr("size"), 42, "input size substituted");
		equals($r.find(".mult2").length, 2, "compound mult list has the right count");
		equals($r.find(".mult2").slice(0,1).find("span").text(), 1, "first span text");
		equals($r.find(".mult2").slice(1,2).find("span").text(), 2, "second span text");
		equals($r.find(".mult2").slice(0,1).find("a").text(), "one", "first anchor text");
		equals($r.find(".mult2").slice(1,2).find("a").text(), "two", "second anchor text");
		equals($r.find(".mult2").slice(0,1).find("a").attr("href"), "http://one/", "first anchor href");
		equals($r.find(".mult2").slice(1,2).find("a").attr("href"), "http://two/", "second anchor href");
	});

	test("id removal", function() {
		expect(1);
		var $r = $(picosnippet(document.getElementById("id"),
			{}
		));
		var id = $r.attr("id");
		equals(id, "", "id removed");
	});
	test("id change", function() {
		expect(1);
		var $r = $(picosnippet(document.getElementById("id"),
			{main:{id:"newid"}}
		));
		equals($r.attr("id"), "newid", "id changed");
	});
	test("checked", function() {
		expect(8);

		var $b = $("#chbox");
		ok($b.find(".check1").is(":checked"), "before: checked1 checked");
		ok(!$b.find(".check2").is(":checked"), "before: checked2 not checked");
		ok($b.find(".check3").is(":checked"), "before: checked3 checked");
		ok(!$b.find(".check4").is(":checked"), "before: checked4 not checked");

		var $r = $(picosnippet(document.getElementById("chbox"),
			{
				check1:{checked:1},
				check2:{checked:1},
				check3:{checked:0},
				check4:{checked:0},
			}
		));

		ok($r.find(".check1").is(":checked"), "after: checked1 checked");
		ok($r.find(".check2").is(":checked"), "after: checked2 checked");
		ok(!$r.find(".check3").is(":checked"), "after: checked3 not checked");
		ok(!$r.find(".check4").is(":checked"), "after: checked4 not checked");
	});
	test("no recurse", function() {
		expect(3);
		var $r = $(picosnippet(document.getElementById("recurse"),
			{main:"xyz","xyz":"abc"}
		));
		equals($r.text(), "xyz", "main replacement");
		equals($r.attr("title"), "meow", "main original title");
		equals($r.find(".xyz").length, 0, "no kids");
	});
	test("recurse", function() {
		expect(3);
		var $r = $(picosnippet(document.getElementById("recurse"),
			{main:{title:"xyz"},"xyz":"abc"}
		));
		equals($r.attr("title"), "xyz", "main new title");
		equals($r.find(".xyz").length, 1, "kid survived");
		equals($r.find(".xyz").text(), "abc", "kid replaced");
	});
}
