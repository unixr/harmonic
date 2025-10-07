# Harmonic

<img width="129" height="137" alt="HarmonicV1" src="https://github.com/user-attachments/assets/5d70f534-310b-4d22-b49a-0b4d17498088" />

**VIS Cybersecurity Dashboard** **Version:** 1.0  
**Last Updated:** October 6, 2025

> **License Notice** \> This program is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License**, as published by the **Free Software Foundation**, either version 3 of the License, or (at your option) any later version.
>
> This program is distributed in the hope that it will be useful, but **WITHOUT ANY WARRANTY**; without even the implied warranty of **MERCHANTABILITY** or **FITNESS FOR A PARTICULAR PURPOSE**.  
> See the **GNU General Public License** for more details.
>
> You should have received a copy of the **GNU General Public License** along with this program.  
> If not, see: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

-----

## Overview

Welcome to **HARMONIC**. These terms and conditions outline the rules for using our computational tool.  
By using HARMONIC, you fully agree to these terms. If you disagree with any part, do not use the tool.

**HARMONIC** is made available under the **GNU General Public License, version 3 (GNU General Public License v3.0)**.

\<img width="1921" height="994" alt="image" src="[https://github.com/user-attachments/assets/db6427fd-fc5d-4d3e-9062-36efd10e6d8f](https://github.com/user-attachments/assets/db6427fd-fc5d-4d3e-9062-36efd10e6d8f)" /\>

-----

## 1\. License of Use

HARMONIC is licensed under the **GNU General Public License v3.0 (GPLv3)**.  
This means you have the freedom to:

  - **Run** the program for any purpose.
  - **Study** how the program works and adapt it to your needs.
  - **Redistribute** copies to help others.
  - **Improve** the program and release your modifications to the public.

Provided that you follow these terms:

  - **Keep the same license:** Any redistribution or derivative work of HARMONIC must also be licensed under the GNU GPL v3.0.
  - **Make the source code available:** If you distribute modified copies of HARMONIC, you must make the corresponding source code available.
  - **Preserve copyright notices:** All copyright notices and references to the original license must be maintained.
  - **No warranties:** The software is provided "as is," without warranties.

**Read the full license:** [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

-----

### 1.1. Attribution and Credits

When using, modifying, or redistributing HARMONIC, or any derivative work, include the following notice:

> “This work uses the **HARMONIC 1.0** computational tool, developed by **Ricardo Conde Camillo Silva/UNESP** and **Kelton Augusto Pontara da Costa/UNESP**, licensed under the **GNU General Public License v3.0**.”

-----

## 2\. Disclaimer of Warranty

**HARMONIC** is provided **“AS IS”**, without any kind of warranty, express or implied.  
This includes, but is not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement of third-party rights.

The developers and contributors **do not guarantee** that the tool will meet your needs, that its operation will be uninterrupted or error-free, or that any defects will be corrected.  
The entire risk related to the quality and performance of the tool is assumed by you.

-----

## 3\. Limitation of Liability

In no event shall the authors, copyright holders, or contributors of HARMONIC be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption), under any theory of liability—whether in contract, strict liability, or tort—arising from the use of this tool, even if advised of the possibility of such damages.

-----

## 4\. Use of the Tool

You agree **not to use** HARMONIC for any illegal, defamatory, or rights-infringing purpose.  
You are solely responsible for the results obtained from using the tool and for any data processed with it.

-----

## 5\. Modifications to Terms

The developers of HARMONIC reserve the right to modify these terms and conditions at any time.  
It is your responsibility to periodically check for changes.  
Continued use of the tool after the publication of changes constitutes acceptance of the new terms.

-----

## 6\. Contact

For more information, questions, or to report issues, please contact:  
**unixconde@gmail.com** ---

# Usage

The **HARMONIC** tool, in its first version, is designed for the **comparison of neural network training results** between two experiments that cover **8 classes**.

Experiments with a different number of classes **will require code refactoring** by the user—which is permitted and encouraged under the **GNU GPL v3.0**, as long as the modifications are also distributed under the same license.

-----

## 1\. CSV File Structure

HARMONIC performs comparisons between results obtained from two neural network models, saved in CSV files, regardless of the network architecture.

The files must follow these conventions:

  - `Model1_Results.csv` and `Model2_Results.csv`: results of each model's metrics.
  - `Model1_Logits.csv` and `Model2_Logits.csv`: raw results of each model's **logits**.

-----

## 2\. Structure of `Model1_Results.csv` and `Model2_Results.csv` Files

`Epoch` `Phase` `Loss` `Accuracy` `Precision` `Recall` `AUC` `MSE` `Confusion Matrix`

-----

## 3\. Structure of `Model1_Logits.csv` and `Model2_Logits.csv` Files

`Epoch` `Phase` `Target` `logit_0` `logit_1` `logit_2` `logit_3` `logit_4` `logit_5` `logit_6` `logit_7`

-----

## 4\. Running the Tool

The tool can be run on an Apache server or in Visual Studio Code with the Live Server extension.

-----

## 5\. Interactive Features

The HARMONIC dashboard was designed to offer a dynamic and focused analysis of the results.

#### Interactive Charts

The *Accuracy per Epoch*, *Loss per Epoch*, and *Radar* charts are interactive.  
To isolate the view and analyze the behavior of a specific model or phase (Train/Validation), simply click on the corresponding legend.  
Clicking it again returns to the full view.

#### Logits Visualization

As the logits files can contain thousands of records, the tool optimizes the display to ensure good performance.  
Upon each load, the panel automatically displays 7 random examples from each model.

To view new samples, simply reload the page (by pressing F5).  
New logits will be randomly selected and displayed on the dashboard.

-----

## How to Cite HARMONIC

If you used HARMONIC in your work, research, or project, please cite it. This helps give visibility to the project and acknowledges the developers' efforts.

### Citation Format

SILVA, Ricardo Conde Camillo; COSTA, Kelton Augusto Pontara da. **HARMONIC - VIS Cybersecurity Dashboard**. Version 1.0. UNESP, 2025. Available at: `<https://github.com/unixr/harmonic>`. Accessed on: dd mmm. yyyy.

### BibTeX

Use the following BibTeX entry:

```bibtex
@software{SilvaCosta2025Harmonic,
  author    = {Silva, Ricardo Conde Camillo and da Costa, Kelton Augusto Pontara},
  title     = {{HARMONIC - VIS Cybersecurity Dashboard}},
  year      = {2025},
  version   = {1.0},
  publisher = {{UNESP}},
  date      = {2025-10-06},
  doi       = {10.5281/zenodo.17281598},
  url       = {https://github.com/unixr/harmonic}
}
```

-----

## License

© 2025 Ricardo Conde Camillo Silva / Kelton Augusto Pontara da Costa – UNESP  
Licensed under the GNU General Public License v3.0 (GPLv3)  
See the `LICENSE` file for the official English version or `LICENSE_pt_BR` for the unofficial Portuguese translation.  
See also: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)
