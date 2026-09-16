# Mixer Theory

## General Mixer Theory

In a receiver, the mixer is responsible for converting the received radio signal (RF) into a (usually) lower **intermediate frequency** (IF), making it far more forgiving to subsequently process. A mixer achieves this by multiplying the RF with a locally furnished signal, generating (ideally) a pair of new signals whose frequencies are precisely the sum and difference of the RF and LO frequency. To better understand this phenomenon, consider two signals $V_\text{RF}(t)$ and $V_\text{LO}(t)$ defined as the pure tones

\begin{equation}
    V_\text{RF}(t) = V_\text{rf}\cos(\omega_\text{rf}t + \phi_\text{rf}), \quad V_\text{LO}(t) = V_\text{lo}\cos(\omega_\text{lo}t + \phi_\text{lo}).
\end{equation}

Mixing these signals, or more specifically **analog-multiplying** them, obtains a new pair of signals

\begin{equation}
\begin{aligned}
    V_\text{out}(t) &= k\cdot \big[V_\text{rf}\cos(\omega_\text{rf}t + \phi_\text{rf})\big] \cdot \big[V_\text{lo}\cos(\omega_\text{lo}t + \phi_\text{lo})\big] \\
    &= \frac{kV_\text{lo}V_\text{rf}}{2}\big[\cos\left((\omega_\text{lo} - \omega_\text{rf})t + (\phi_\text{lo} - \phi_\text{rf})\right) \\
    &\quad\quad\quad\quad\quad\quad\quad+ \cos\left((\omega_\text{lo} + \omega_\text{rf})t + (\phi_\text{lo} + \phi_\text{rf})\right)\big],
    \label{eq:mixing}
\end{aligned}
\end{equation}

where \(k\) is some constant voltage gain/loss produced by the mixing device — this is exactly the *conversion gain* defined generically in [RF Measurement Parameters](rf-measurement-parameters.md#gain-conversion-gain). Indeed, we clearly see that the product of two signals is proportional to the algebraic sum of a pair of sum and difference signals. These will appear as two sidebands in the frequency spectrum, equally spaced from the LO frequency by the RF.

Evidently, converting down rather than up is preferable in receivers not only for avoiding cumbersome frequency-dependent behavior, but also because it is easier to low-pass filter a low-end frequency than to band-pass or high-pass a high-end one. This is especially true given that a mixer, ideal or otherwise, will mix RF with any of the LO's harmonics, which can easily generate spurious difference frequencies right alongside the fundamental's sum frequency. It is usually best to pick an LO near to the RF, so that the resultant IF is fairly low and distant, and then simply low-pass filter everything else away (with caveats; see below). As an example, in FM broadcast, the LO sits somewhere around 98.7 to 118.7 MHz, while the RF spans 88 MHz to 108 MHz. Consequently, the IF ends up at 10.7 MHz, far lower than either the RF or LO frequency.

## General Approaches to Mixer Realization

### Active Devices

Concerning mixing devices, there are many well-understood, longstanding options for mixing any two signals in a practical system. For isolated devices, such as BJTs, FETs, diodes, and other semiconducting devices, mixing relies on their nonlinear transfer behavior; in some cases, the nonlinear switching of the device. Concretely, let a nonlinear device respond as $V_\text{out} = f(v(t))$, where $f$ is any analytic function about a bias point $V_0$ — square-law, exponential, or any other device. Writing the small signal input as $v(t) = V_0 + v_\text{in}(t)$ and Taylor-expanding gives us

\begin{equation}
    f(V_0 + v) = \sum_{n=0}^{\infty} c_n\, v(t)^n, \qquad c_n = \frac{f^{(n)}(V_0)}{n!}.
\end{equation}

The $c_n$ are device-specific but the expansion is general. Now suppose we drive the device with the sum of two tones (summed at a junction, for instance),

\begin{equation}
    v_\text{in}(t) = V_{lo}\cos(\omega_{lo} t) + V_{rf}\cos(\omega_{rf} t).
\end{equation}

The only term of the transfer function that produces a product of the two inputs is the quadratic one, $c_2 v(t)^2$. Expanding and keeping just the cross term (the self-terms $\cos^2(\omega_{lo}t)$, $\cos^2(\omega_{rf}t)$ only generate DC and harmonics, so they're irrelevant here) leaves us with

\begin{equation}
    V_\text{out}(t) = 2c_2 V_{lo}V_{rf}\cos(\omega_{lo}t)\cos(\omega_{rf}t).
\end{equation}

Alas, we have achieved the desired mixing product via a physical device. This expands in a manner identical to \eqref{eq:mixing} to obtain the sum and difference frequencies.

A negative consequence of using a single device is that it is fundamentally unbalanced (single-ended). LO and RF will leak through the device and exit out of the IF port. Similarly, RF can leak into the LO port, and vice versa. This is to say, such a mixer will have poor **isolation**. This should not be unexpected, for the transfer behavior's expansion contains linear feedthrough terms *as well as* quadratic, harmonic, and higher order terms. Furthermore, an unbalanced mixer has no inherent symmetry in signal injection, allowing common-mode noise and input harmonics to leak through. These combined effects will also contribute to the generation of unwanted intermodulation products.

Conversely, one advantage of these mixers is that using an active device in particular yields **conversion gain**. This is essentially how much greater the IF output power is compared to the RF input power (or how much greater than unity the voltage ratio is). Refer to the \(k\) factor in equation (2). This is sometimes beneficial if LO power is weak. All in all, single-device mixers should be regarded as simple, but imperfect solutions. A specific example of a JFET mixer is discussed in the [FM Superhet](../projects/fm-superhet/index.md) build log (it was ultimately discarded).