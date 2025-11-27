---
order: 1
title: Standard Description
description: Detailed content of enterprise standards
lastUpdated: 2023-12-11T00:00:00.000Z
---

# Enterprise Standards for Rimag Imaging Hospital Group

*Published by the Standardization Management Committee of Yimai Sunshine Imaging Hospital Group*

# Standard for the Naming and Coding of Medical Imaging Examination Items

*Standard for the Naming and Coding of Medical Imaging Examination Items*

## 1 Scope

This standard specifies the rules for naming and classification coding of medical imaging examination items.

This standard is applicable to medical institutions conducting medical imaging examination services, health information statistics and analysis, and medical imaging related software and hardware development.

## 2 Normative References

The following documents are essential for the application of this document. For dated references, only the dated version applies to this document. For undated references, the latest version (including all amendments) applies to this document.

* GB/T 7027-2002 Basic Principles and Methods for Information Classification and Coding
* GB/T 42204-2022 Clinical Medical Equipment Communication Specification - Imaging Equipment
* WS 363.1-2011 Health Information Data Source Directory Part 1: General Principles
* WS/T 306-2009 Health Information Dataset Classification and Coding Rules
* WS 364.8-2011 Health Information Data Element Value Domain Code Part 8: Clinical Auxiliary Examination
* T/CHIA 23-2021 Medical Imaging Equipment Examination Site Classification Code Standard

## 3 Terms and Definitions

The following terms and definitions apply to this document.

### 3.1 Medical Imaging

Images that represent the internal structure, density, tissue composition, and other information of the human body through the interaction between certain media (such as X-rays, electromagnetic fields, ultrasound waves, etc.) and the human body for medical purposes.

### 3.2 Medical Imaging Examination Item Name

The standardized naming of examination items that scientifically reflects the purpose, operational process, and other characteristics of medical imaging examination items.

### 3.3 Medical Imaging Examination Item Code

The unique identifier for medical imaging examination items, composed of numbers, letters, and other symbols.

### 3.4 Coding Rules

The standards or principles followed when coding data.

### 3.5 Modality

Different types of medical imaging technologies used to create internal body images.

### 3.6 Equipment Type

Different subtypes of medical imaging equipment within the same imaging technology, such as 16-slice CT and 64-slice CT, 1.5T MR and 3.0T MR, etc.

### 3.7 Examination Site

The specific body area that needs to be observed, diagnosed, treated, or operated during medical examination.

### 3.8 Scanning Method

A general term for imaging examination operations across various modalities and types of medical imaging equipment.

### 3.9 Post-processing Method

Medical image post-processing refers to the process of digitally processing medical images to improve image quality, enhance image information, assist diagnosis, or perform other analysis and processing. These processes may include image enhancement, noise reduction, contrast adjustment, 3D reconstruction, and other techniques.

### 3.10 Position

The posture or position of the patient during X-ray imaging to ensure optimal imaging of specific areas.

### 3.11 Additional Code

Additional codes are coding reserved for extending standard examination items.

## 4 Abbreviations

The following abbreviations apply to this document.

* CT (Computed Tomography)
* MRI (Magnetic Resonance Imaging) (In this standard, MR is consistently used to represent MRI magnetic resonance imaging)
* DR (Digital Radiography)
* CR (Computed Radiography)
* MG (Mammography)
* RF (Radio Fluoroscopy) (Digital Gastrointestinal)

## 5 General Principles

### 5.1 Uniqueness

Each medical imaging examination item name and code corresponds to unique and irreplaceable data collection content within its scope of application. The same examination item cannot have multiple (different) names for the same examination purpose, scanning range, scanning content, and scanning method; its clinical applicability is unique. Examination items can be further subdivided or included, but cannot be replaced.

### 5.2 Comprehensiveness

Examination items should comprehensively cover routine clinical applications while maintaining openness to emerging technologies and rare applications.

### 5.3 Clarity and Accuracy

Examination items should be clear and precise, avoiding ambiguity or misunderstanding, ensuring that all users can accurately understand and follow them.

### 5.4 Extensibility

The framework of examination item names and codes should have room for expansion, allowing for additions and adjustments to examination item names and codes based on developments.

### 5.5 Combinability

The examination item coding should support medical institutions in combining multiple examination items for specific diseases or disease types according to their needs, manifesting as specialized disease combination items.

## 6 Medical Imaging Examination Item Names and Coding

### 6.1 Classification of Medical Imaging Examination Items

Medical imaging examination items should be categorized according to examination site, examination type, special requirements, etc., for management and use purposes.

#### 6.1.1 Classification by Examination Site

The definition and division of examination sites is a core component of this standard. CT, MR, and DR modalities share a unified site classification system with unified coding. This site system is divided into three levels, including primary sites, secondary sites, and tertiary sites. The sites here are broad classification concepts, including anatomical sites, organs, and may also include systems or other classifications.

Primary Sites: Divided based on basic human anatomical structures and actual medical imaging examination work needs, including head, neck, spine, chest, abdomen, pelvis, limbs and joints.

Due to the importance of the vascular system in medical imaging technology and its key role in the diagnosis of various diseases, blood vessels are included in the primary site classification. Additionally, to meet clinical flexibility requirements, a "Non-specified Site" classification has been added.

Medical imaging primary site classification and coding, see Table 1.

| Primary Code | Primary Site       |
| ------------ | ------------------ |
| 01           | Head               |
| 02           | Neck               |
| 03           | Spine              |
| 04           | Chest              |
| 05           | Abdomen            |
| 06           | Pelvis             |
| 07           | Limbs and Joints   |
| 08           | Blood Vessels      |
| 99           | Non-specified Site |

Secondary Sites: Specific regions or body structures divided from primary sites according to imaging examination characteristics, serving as basic scanning operation units and observation diagnosis units, as well as important units for data interconnection and statistical analysis.

Tertiary Sites: More detailed divisions of secondary sites, mainly aimed at specifying concrete examination sites or organs to meet specific, clear, or specialized clinical examination and diagnostic needs.

#### 6.1.2 Classification by Modality and Equipment Type

In this standard, three main modality types are included: CT, MR, and X-ray examinations. Due to the cost differences between different equipment types, equipment type codes are included in the item names and codes. This standard recommends using examination items and codes that do not distinguish specific equipment.

This standard generates examination item names and codes based on specific equipment types, see Table 2.

| Modality Code | Modality Name | Equipment Type Code | Equipment Type Name |
| ------------- | ------------- | ------------------- | ------------------- |
| 2             | CT            | 20                  | CT Non-specific     |
| 2             | CT            | 21                  | Below 16-slice CT   |
| 2             | CT            | 22                  | 16-slice CT         |
| 2             | CT            | 23                  | Above 16-slice CT   |
| 2             | CT            | 24                  | 256-slice CT        |
| 2             | CT            | 25                  | Dual-source CT      |
| 3             | MR            | 30                  | MR Non-specific     |
| 3             | MR            | 31                  | Below 1.5T MR       |
| 3             | MR            | 32                  | 1.5T MR             |
| 3             | MR            | 33                  | 3.0T MR             |
| 3             | MR            | 34                  | 5.0T MR             |
| 3             | MR            | 35                  | 7.0T MR             |
| 4             | X-ray         | 40                  | DR                  |
| 4             | X-ray         | 42                  | Mobile DR           |
| 4             | X-ray         | 43                  | CR                  |
| 4             | X-ray         | 44                  | MG                  |
| 4             | X-ray         | 45                  | RF                  |

#### 6.1.3 Classification by Scanning Method

In different medical imaging modalities, the scanning methods used have certain differences, and their names also vary. For example, in CT and MR, scanning methods are usually called "scanning techniques" or "imaging techniques," while in X-ray they are called "radiography techniques." For unified classification, this standard no longer distinguishes between different medical imaging modalities but uniformly refers to them as "scanning methods."

For ease of understanding and application, this standard classifies scanning methods in medical imaging modalities as follows, and these major categories can be further subdivided. For detailed scanning method classification and coding table, see Appendix D.

CT Scanning Methods: Including plain scan, enhanced scan, angiography, special scanning, etc.

MR Scanning Methods: Including plain scan, enhanced scan, angiography, water imaging, functional imaging, and special imaging, etc.

X-ray Scanning Methods: Including routine X-ray radiography, X-ray fluoroscopy, mammography, X-ray contrast imaging, etc.

#### 6.1.4 Classification by Post-processing Method

Medical imaging data post-processing methods refer to all methods of computer processing of original image data. This standard categorizes these post-processing methods into three-dimensional reconstruction, quantitative measurement, post-processing simulation, and artificial intelligence analysis post-processing, etc. These categories can be further subdivided; for detailed post-processing classification and coding table, see Appendix E.

#### 6.1.5 Classification by Position

In the field of medical imaging technology, X-ray radiography has the widest range of applications, and its positions are also diverse. These positions are all aimed at better displaying specific site structures or lesions, thus requiring different positions during examination.

For example, anteroposterior position, lateral position, oblique position, axial position, etc. For position classification and coding table, see Appendix F.

### 6.2 Medical Imaging Examination Item Names

Medical imaging examination item names are used in scenarios such as clinical doctors issuing examination request forms, patients paying for examination items, medical imaging technicians selecting specific operation procedures and technical parameters, imaging doctors providing corresponding diagnostic reports, and subsequent data statistics and analysis. Therefore, item names should have the following characteristics: scientifically accurate, concise and clear, unique, readable, combinable, and computer-recognizable, to ensure their applicability in various scenarios.

The examination item names in this standard all begin with "\*" for distinguishing from non-standard items in the system when the actual standard is implemented, which can be removed based on actual needs.

The format in this standard follows content combination and can adopt different combination methods according to actual needs, but the coding should remain unified.

#### 6.2.1 Components of Item Names

Equipment Modality and Type: Such as CT, 16-slice CT, MR, 3.0T MR, DR, MG, etc.

Examination Site: Such as craniocerebral, chest, upper abdomen, etc.

Scanning Method: Such as plain scan, enhanced scan, etc.

Other Specific Information: Such as post-processing method, position, etc.

#### 6.2.2 CT/MR Examination Item Name Format

\*Equipment Modality and Type + Examination Site + (Scanning Method + Post-processing)

Equipment Type: Examination items directly use CT, MR, DR to indicate equipment type, indicating that the examination item does not distinguish specific equipment types. However, in some regional medical insurance payment rules, different equipment types have different charging standards, so equipment type information like "16-slice CT, 64-slice CT, 1.5T MR, 3.0T MR" needs to be encoded into the item name.

Examination Site: Refers to the scanning site of the examination item, which is the most detailed examination site, i.e., tertiary site.

Scanning Method and Post-processing are combined using English parentheses.

Examples:

```
CT Craniocerebral (Plain Scan + 3D Reconstruction)
MR Chest (Plain Scan + Enhanced)
3.0T MR Chest (Plain Scan + Enhanced)
```

#### 6.2.3 X-ray Examination Item Name Format:

\*Equipment Type + Examination Site + Scanning Method + Position

For DR examinations, the scanning method defaults to X-ray radiography and is therefore not expressed in the name.

Examples:

```
DR Cervical Spine AP
MG Bilateral Breast Mammography AP, Lateral
```


### 6.3 Medical Imaging Examination Item Coding

#### 6.3.1 Coding Method

The medical imaging examination item coding follows the method specified in GB/T 7027.

#### 6.3.2 Coding Rules

The coding uses a combination of numbers and letters, with consistent digits and types within the same category.

The "Non-specified Site" code in each category is designated as 99.

Each code has its specific meaning and usage, which can be combined and extended as needed.

Letters "i, o, l" are not included in coding as they can be visually confused with numbers "1, 0".

The coding format can be adjusted according to requirements.

#### 6.3.3 Coding Elements

Medical imaging examination item coding adopts a 14-digit code, with the code position structure including 5 parts corresponding to different information elements, see Table 3.

```
Positions 1-2 are modality and equipment type codes; 2x represents CT examination, where x indicates different equipment types, such as 20 indicating CT examination without equipment distinction; 3x represents MR, where 30 indicates MR examination without equipment distinction; 4x represents X-ray examination, where 40 indicates DR, 44 indicates MG, 45 indicates RF, etc.

Positions 3-8 are anatomical site codes, where positions 3-4 are primary examination site codes; positions 5-6 are secondary examination site codes; positions 7-8 are tertiary examination site codes.

Positions 9-10 are scanning method codes.

Positions 11-12 are post-processing/positioning codes, for CT/MR examination items, these are post-processing codes; for X-ray examination items, these are positioning codes.

Positions 13-14 are additional codes, which are reserved for extending standard examination items.
```

| **Code Position** | 1-2 | 3-4 | 5-6 | 7-8 | 9-10 | 11-12 | 13-14 |
| ---------------- | --- | --- | --- | --- | ---- | ----- | ------ |
| **Information Elements** | Equipment Type | Primary Site | Secondary Site | Tertiary Site | Scanning Method | Post-processing/Position | Additional Code |

Examples:

```
Examination Item *CT Paranasal Sinuses (Plain Scan + 3D Reconstruction)
Item Code
20010701111100
20 01 07 01 11 11 00
CT Head Nasal Paranasal Sinuses Plain Scan 3D Reconstruction Additional Code
```

Examples:

```
*CT Craniocerebral (Plain Scan) coded as "20010100110000"
*16-slice CT Left Knee Joint (Plain Scan + Enhanced + 3D Reconstruction) coded as "22072201221100"
*MR Thorax (Plain Scan + Enhanced) coded as "30040100220000"
*3.0T MR Hepatic Dynamic Contrast Enhancement (DCE-MRI) coded as "33050101230000"
*DR Cervical Spine AP coded as "40030202000100"
*MG Bilateral Mammography AP, Lateral coded as "44040803M13700"
```

* CT standard examination item names and codes see Appendix G.
* MR standard examination item names and codes see Appendix H.
* DR standard examination item names and codes see Appendix I.
* MG standard examination item names and codes see Appendix J.
* RF standard examination item names and codes see Appendix K.

## 7 Personalized Examination Item Naming and Coding Management Scheme

In certain medical institutions, due to professional specialization or specific examination requirements, standard examination items alone may not fully meet comprehensive ordering needs. Therefore, to better meet practical needs, medical institutions can add supplementary information to the standard coding system for extended coding and naming of personalized examination items.

Examples:

For vertebral body localization and quantification, institutions can append extension information after the standard item name "*CT Cervical Spine (Plain Scan)" using a "-" connector.

* *CT Cervical Spine (Plain Scan)-(C1-C3), coded as 20030202110000-x
* *CT Cervical Spine (Plain Scan)-(C2-C4), coded as 20030202110000-x

In MR examinations, to specify particular scanning sequences included in the item, extension information can be added after the standard item name for definition.

* *MR Craniocerebral (Plain Scan)-including DTI, coded as 30010100110000-x

To facilitate clinical ordering, multiple standard items can be combined into a personalized examination item.

* *MR Craniocerebral (Plain Scan)-Epilepsy Protocol, coded as 30010100110000-x

These names can use aliases in practical work for convenience, but the coding must remain consistent.

## References

[1] Ding Wenlong, Wang Haijie. Systematic Anatomy [M] 3rd Edition. Beijing: People's Medical Publishing House, 2015.

[2] Zhang Weimin, Qin Weichang. Medical Imaging Technology - MR Examination Technology Volume [M]. Beijing: People's Medical Publishing House, 2014.

[3] Gao Jianbo. Modern Medical Imaging Technology [M]. Beijing: People's Medical Publishing House, 2016.

[4] Li Zhenlin, Ni Hongyan. Chinese Medical Imaging Technology - MR Imaging Technology Volume [M]. Beijing: People's Medical Publishing House, 2017.

[5] Gao Jianbo. Chinese Medical Imaging Technology - CT Imaging Technology Volume [M]. Beijing: People's Medical Publishing House, 2017.

[6] Yu Jianming. Chinese Medical Imaging Technology - Digital X-ray Imaging Technology Volume [M]. Beijing: People's Medical Publishing House, 2017.

[7] Cui Huixian, Li Ruixi. Local Anatomy [M] 9th Edition. Beijing: People's Medical Publishing House, 2018.

[8] Ding Wenlong, Liu Xuezheng. Systematic Anatomy [M] 9th Edition. Beijing: People's Medical Publishing House, 2018.

[9] Dong Jingwu. International Statistical Classification of Diseases and Related Health Problems: ICD-10 [M]. Beijing: People's Medical Publishing House, 2008.

[10] National Medical Security Administration. National Medical Service Project Directory [EB/OL]. [2023-10-17]. [https://code.nhsa.gov.cn/search/html?sysflag=81](https://code.nhsa.gov.cn/search/html?sysflag=81)

[11] Zhejiang Provincial Clinical Radiology Quality Control Center. Unified Classification, Naming, and Coding Directory for Radiological Examination Items (2022 Edition) [EB/OL]. [2022-06-30] [2023-10-17]. [http://www.zjradiology.org/portal/details/1543840005644881920](http://www.zjradiology.org/portal/details/1543840005644881920)

[12] National Health Commission, National Administration of Traditional Chinese Medicine, National Disease Control Bureau. National Medical Service Project Technical Specifications (2023 Edition) [EB/OL]. [2023-09-28] [2023-10-17]. [http://www.nhc.gov.cn/caiwusi/s7785t/202309/914aec9618944ee2b36621d33517e576/files/0b6890c616b24b5bb2344d1ca435ba3c.pdf](http://www.nhc.gov.cn/caiwusi/s7785t/202309/914aec9618944ee2b36621d33517e576/files/0b6890c616b24b5bb2344d1ca435ba3c.pdf)