# RF Measurement Parameters

This notes section reviews general figures of significance in the measurement of an RF system.

## Gain / Conversion Gain

For any two-port network, gain describes how output power compares to input power. That is,

\begin{equation}
    \text{Gain (dB)} = 10\log_{10}\left(\frac{P_\text{out}}{P_\text{in}}\right).
\end{equation}

If, rather, we are only concerned with voltage gain/loss, this is simply the output/input voltage ratio relative to unity. When input and output occur at different frequencies — as in a mixer or any other frequency-translating stage — this is usually called **conversion gain** (or conversion loss, if negative) rather than simply gain, but the definition is the same either way. Conversion gain/loss is often the most important parameter to optimize for in a mixer, since it sets the noise floor for whatever amplification follows. In the language of S-parameters, we instead write

\begin{equation}
    \text{Gain (dB)} = 20\log_{10}(|S_{21}|),
\end{equation}

where $S_{21}$ is the forward transmission coefficient.
## Port Isolation

In any multi-port RF network, **isolation** quantifies how much of a signal injected at one port leaks out at another, unintended port — i.e. **feedthrough**. For ports A and B, the isolation from A to B is

\begin{equation}
    \text{Isolation}_{A \to B} \text{ (dB)} = 10\log_{10}\left(\frac{P_{A,\text{in}}}{P_{A,\text{out at }B}}\right).
\end{equation}

A network with several accessible ports has an isolation figure for every ordered pair of ports; which pairs actually matter is context-dependent. In a mixer, LO-to-IF isolation is usually the most critical, since the LO is typically the strongest source of feedthrough and must be filtered out to avoid overloading downstream stages. Also, because a low IF forces the LO and RF close together in frequency, LO-to-RF feedthrough becomes a real risk, since it can bypass a preselector and radiate back out an antenna. In an amplifier, the analogous concern is often reverse isolation ($S_{12}$), which limits how much output signal leaks back to the input. Once again, we can, in the language of S-parameters, write

\begin{equation}
    \text{Isolation}_{2 \to 1} \text{ (dB)} = 20 \log_{10}(|S_{12}|).
\end{equation}

## Third-Order Intermodulation Distortion and Third-Order Intercept Point

**Third-order intermodulation distortion** (IMD3) is a critical measure of a device's unintended nonlinearity. When two closely-separated RF tones $\omega_1$ and $\omega_2$ are simultaneously injected into a nonlinear element, the third-order nonlinearity (cubic) generates new RF-domain products.

??? note "Full derivation: where the third-order products come from"
    If we model the nonlinear device's transfer behavior by the power series

    \begin{equation}
        v_\text{out} = a_1v_\text{in}(t) + a_2v^2_\text{in}(t) + a_3v^3_\text{in} + \cdots
    \end{equation}

    and let the input be two equal-amplitude tones

    \begin{equation}
        v_\text{in}(t) = A\cos(\omega_1 t) + A\cos(\omega_2 t),
    \end{equation}

    the cubic output term expands as

    \begin{equation}
    \begin{aligned}
        v_\text{in}^3(t) &= [A\cos(\omega_1 t) + A\cos(\omega_2 t)]^3 \\
        &= A^3\cos^3(\omega_1 t) + A^3\cos^3(\omega_2 t) \\
        &\qquad\qquad\qquad+\;3A^3\cos^2(\omega_1 t)\cos(\omega_2 t) + 3A^3\cos(\omega_1 t)\cos^2(\omega_2 t).
    \end{aligned}
    \end{equation}

    Looking at just the third term, applying a trig identity yields

    \begin{equation}
        3A^3\cos^2(\omega_1 t)\cos(\omega_2 t) = \frac{3A^3}{2}[1 + \cos(2\omega_1 t)]\cos(\omega_2t).
    \end{equation}

    In this form, we again recognize our mixing product. However, in this instance, the product yields sum and difference tones at the frequencies

    \begin{equation}
        2\omega_2 - \omega_1, \quad 2\omega_2 + \omega_1.
    \end{equation}

    By the same argument, the second cross-term gives the alternate pair of products.

Crucially, the difference products land right around the original input tones, since we assumed $\omega_1 \approx \omega_2$. If such a *ghost* signal falls within the passband of a downstream stage, it gets processed right alongside the intended signal, generating **spurious** output products that become indistinguishable from the genuine ones.

A useful, practical measure of IMD3 is the **spur-to-fundamental suppression**, given by

\begin{equation}
    \text{IMD3 Suppression (dBc)} = 10 \log_{10}\left(\frac{P_\text{spur}}{P_\text{fundamental}}\right).
\end{equation}

To characterize how prone a device is to IMD3, we measure the **third-order intercept point** (IP3), defined as the extrapolated power level at which the fundamental and the IMD3 lines would intersect if tangent lines were extended from their peak slopes. Concretely,

\begin{equation}
    \text{IP3}_\text{out} = P_\text{fundamental} + \frac{P_\text{fundamental} - P_\text{IMD3}}{2}.
\end{equation}

## 1-dB Compression Point

Another useful measure of a device's linearity is the power level at which the actual gain of a device has dropped by 1 dB from its linear value. As opposed to IMD3, which is concerned with a system's inherent/unavoidable nonlinear transfer behavior, **1-dB Compression** is more a measure of a network's nonlinearity due to saturation or compression. Compactly, we can write

\begin{equation}
    G_\text{compressed} = G_\text{linear} - 1.
\end{equation}

## Dynamic Range
**Dynamic range** describes the span of input (or output) power levels over which a device operates usefully — bounded below by the noise floor and above by the onset of significant nonlinearity. Below the lower bound, a signal is buried in noise; above the upper bound, distortion products corrupt the output.

The simplest formulation, sometimes called the **linear dynamic range**, spans from the noise floor up to the 1-dB compression point, given by

\begin{equation}
    \text{DR (dB)} = P_{1\text{dB}} - P_\text{noise floor}.
\end{equation}

A more demanding, and often more meaningful, figure is the **spurious-free dynamic range** (SFDR), which instead uses the IMD3 products as the upper limit, since these can appear well before the device visibly compresses. SFDR is the input power range over which the fundamental remains above the noise floor while the third-order spurs remain below it. Using the IP3 defined earlier, this works out to

\begin{equation}
    \text{SFDR (dB)} = \frac{2}{3}\left(\text{IP3}_\text{in} - P_\text{noise floor}\right).
\end{equation}

Because SFDR references the extrapolated IP3 rather than the compression point, it captures the fact that intermodulation spurs — not gain compression — are usually the practical ceiling on usable dynamic range in a well-designed receiver chain.

