We don't live in the dark ages anymore, we live in the computation age, and we
now understand the power of the binary numeral system.

In binary it's easy to understand when something is full: `1111`, empty: `0000`,
or half-full: `1000`. Not only is it easier to compute, it's also easier to
understand.

For example to get the higher bits all you do is an **and** operation: `x &
1100`, to get the lower bits you do `x & 0011`... easy. To do the same in
decimal is much more complicated.

Of course binary takes a lot of space on the screen, it's much easier to
represent these numbers in hexadecimal, so `1111` is `0xF`.

If we divide the day in 16 equal parts, `0x0` would be midnight, and `0x8` noon
(since 8 is half of 16). A half noon would be `0x4` (6 a.m.), and a quarter noon
`0x2` (3 a.m.). Therefore `0x1` is 1:30 a.m.

With **one** digit we already have a good idea of what part of the day we are
at.

Of course the same could have been done in decimal if we divide the day in 10
equal parts, but we don't do that, we divide it in 24, so there's 76 numbers we
never use in the hour part, and the first digit only uses 3 numbers, the other 7
are wasted.

But what if we want more resolution? Well, we divide `0x1` (one hexhour) into 16
equal parts. Each one of these parts is roughly 6 minutes, we can call these
chunks hexminutes, even though they are much longer. There's 256 hexminutes in a
day.

Two digits is actually all we need to have a good idea what time it is.

Don't believe me? Watch this [hexclock](https://felipec.github.io/hexclock/) in
real-time.

If we divide each hexminute into 16 parts we get chunks of around 21 seconds,
and if wivide these into 16, we have chunks of around 1 second. An hexsecond is
different than a second though, it's ~1.3 seconds.

A day consists of 86400 standard seconds, but 2 ^ 16 hexseconds.

With 16 bits we can represent time up to second resolution, at the time of this
writing it's `0x9370`.

Hexadecimal time is simply better than standard time. Period.
